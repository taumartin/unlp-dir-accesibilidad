import {inject} from '@angular/core';
import {ConfigColumns} from 'datatables.net';
import {CrudLayoutEntityModalOpenEvent} from "../../components/crud-layout/crud-layout.component";
import {ApiPageRequest} from '../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../services/network/api/api-response-page';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormService} from '../../services/ui/form/form.service';
import {ToastService} from '../../services/ui/toast/toast.service';
import {ApiSuccessResponse} from '../../services/network/api/api-success-response';
import {ApiErrorResponse} from '../../services/network/api/api-error-response';
import {Model} from '../../models/model';
import {CrudService} from '../../services/data/crud/crud.service';

export abstract class GenericAbm<T extends Model> {
  protected dtSource: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<T>> = (pagReq) => this.modelService.listAll(pagReq);
  protected isCreating = false;
  protected isUpdating = false;
  protected isDeleting = false;
  protected isEditing = false;

  protected get readonlyInputs(): boolean {
    return !!this.selectedModel && !this.isEditing;
  }

  private entityModal: NgbModalRef | null = null;
  protected selectedModel: T | null = null;

  protected readonly modelForm: FormGroup;

  protected constructor(
    private readonly modelService: CrudService<T>,
    private readonly formService: FormService,
    private readonly toastService: ToastService,
    protected readonly dtColumns: ConfigColumns[],
    protected readonly labels: { [p: string]: string },
    formControls: any,
  ) {
    this.modelForm = inject(FormBuilder).group(formControls);
  }

  protected getFormControlByKey<U = any>(key: string): AbstractControl<U, U> | null {
    return this.modelForm.get(key);
  }

  protected isInvalid(control: AbstractControl | null): boolean {
    return this.formService.isInputInvalid(control);
  }

  protected isValid(control: AbstractControl | null): boolean {
    return this.formService.isInputValid(control);
  }

  private closeModal(): void {
    this.entityModal?.close();
    this.entityModal = null;
  }

  private createModel(model: Omit<T, 'id'>): void {
    if (!this.isCreating) {
      this.isCreating = true;
      this.modelService.create(model).subscribe({
        next: result => this.onEntitySaveEnd(result),
        complete: () => {
          this.isCreating = false;
        }
      });
    }
  }

  private onEntitySaveEnd(result: ApiSuccessResponse | ApiErrorResponse): void {
    if (result.success) {
      this.modelForm.reset();
      this.toastService.showSuccessToast({body: result.message});
      this.closeModal();
      this.selectedModel = null;
    } else {
      this.formService.parseBackendValidation(this.modelForm, result);
      this.toastService.showErrorToast({body: result.message});
    }
  }

  private updateModel(model: Omit<T, 'id'>): void {
    if (!this.isUpdating && this.selectedModel) {
      this.isUpdating = true;
      this.modelService.update(this.selectedModel.id, model).subscribe({
        next: result => this.onEntitySaveEnd(result),
        complete: () => {
          this.isUpdating = false;
        }
      });
    }
  }

  protected abstract getNewModel(formValues: Partial<Omit<T, 'id'>>): Omit<T, 'id'>;

  protected onSave(modal: NgbModalRef | null = null) {
    if (this.modelForm.valid && !this.readonlyInputs) {
      this.entityModal = this.entityModal || modal;
      this.formService.resetFormValidations(this.modelForm);
      const newModel: Omit<T, 'id'> = this.getNewModel(this.modelForm.value);
      if (this.selectedModel) {
        this.updateModel(newModel)
      } else {
        this.createModel(newModel);
      }
    }
  }

  protected abstract getModified(formValues: Partial<Omit<T, 'id'>>): Partial<Omit<T, 'id'>>;

  protected isModified(): boolean {
    if (!this.modelForm || !this.selectedModel) {
      return false;
    }
    return this.modelService.isModified(this.selectedModel, this.getModified(this.modelForm.value));
  }

  protected abstract getPatchedValues(model: T): any;

  protected onEntityModalOpen(event: CrudLayoutEntityModalOpenEvent<T>): void {
    this.modelForm.reset();
    this.entityModal = event.modal;
    this.selectedModel = event.entity ?? null;
    if (this.selectedModel) {
      this.modelForm.patchValue(this.getPatchedValues(this.selectedModel));
    }
  }

  private deleteModel(): void {
    if (!this.isDeleting && this.selectedModel) {
      this.isDeleting = true;
      this.modelService.delete(this.selectedModel.id).subscribe({
        next: result => this.onEntitySaveEnd(result),
        complete: () => {
          this.isDeleting = false;
        }
      });
    }
  }

  protected onDelete(): void {
    this.deleteModel();
  }
}
