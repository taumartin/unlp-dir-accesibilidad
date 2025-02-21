const _buildBaseResponse = (success, status, message) => {
    return {status, success, message};
};

const apiResponse = {
    success: (res, data = null, message = "Operación exitosa", status = 200) => {
        const response = _buildBaseResponse(true, status, message);
        if (data !== null) {
            response.data = data;
        }
        return res.status(status).json(response);
    },

    error: (res, error = null, message = "Ha ocurrido un error inesperado. Intente nuevamente.", status = 500) => {
        const response = _buildBaseResponse(false, status, message);
        if (error !== null) {
            response.error = error;
        }
        return res.status(status).json(response);
    },
};

module.exports = apiResponse;
