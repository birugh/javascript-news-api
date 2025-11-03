export class BaseService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async get(endpoint, option = {}) {
        try {
            const { headers, method = 'GET', params } = option;
            const query = params ? '?' + new URLSearchParams(params).toString() : '';
            const url = params ? `${this.baseUrl}/${endpoint}${query}` : `${this.baseUrl}/${endpoint}`;

            const res = await fetch(url, {
                method,
                headers: {
                    ...(headers || {}),
                },
                
            });

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }

            return res.json();
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error: true, message: error.message };
        }
    }

    async getById(endpoint, id, option = {}) {
        try {
            const { headers, method = 'GET' } = option;
            const url = `${this.baseUrl}/${endpoint}/${id}`;

            const res = await fetch(url, {
                method,
                headers: {
                    ...(headers || {}),
                },
            })
            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }

            return res.json();
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error: true, message: error.message };
        }
    }

    async create(endpoint, option = {}) {
        try {
            const { headers, method = 'GET', body = {} } = option;
            const url = `${this.baseUrl}/${endpoint}`;

            const res = await fetch(url, {
                method,
                headers: {
                    ...(headers || {}),
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }

            return res.json();
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error: true, message: error.message };
        }
    }

    // async updatePut(endpoint, body) {
    //     try {
    //         const res = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-type': 'application/json; charset=UTF-8',
    //             },
    //             body: JSON.stringify(body),
    //         });

    //         if (!res.ok) {
    //             throw new Error(`HTTP Error: ${res.status}`)
    //         }

    //         return res.json();
    //     } catch (error) {
    //         console.error(`Error message: ${error.message}`);
    // return { error:true, message: error.message};
    //     }
    // }

    // async updatePatch(endpoint, body) {
    //     try {
    //         const res = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-type': 'application/json; charset=UTF-8',
    //             },
    //             body: JSON.stringify(body),
    //         });

    //         if (!res.ok) {
    //             throw new Error(`HTTP Error: ${res.status}`)
    //         }

    //         return res.json();
    //     } catch (error) {
    //         console.error(`Error message: ${error.message}`);
    // return { error:true, message: error.message};
    //     }
    // }

    async update(endpoint, id, option = {}) {
        try {
            const { headers, method = 'PUT' } = option;
            const url = `${this.baseUrl}/${endpoint}/${id}`;

            const res = await fetch(url, {
                method,
                headers: {
                    ...(headers || {}),
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }

            return res.json();
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error: true, message: error.message };
        }
    }

    async delete(endpoint, id, option = {}) {
        try {
            const { headers, method = 'DELETE' } = option;
            const url = `${this.baseUrl}/${endpoint}/${id}`;

            const res = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method,
                headers: {
                    ...(headers || {}),
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }

            return { success: true };
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error: true, message: error.message };
        }
    }

    async getFilter(endpoint, id, childEndpoint, option = {}) {
        try {
            const { headers, method = 'GET' } = option;
            const url = `${this.baseUrl}/${endpoint}/${id}/${childEndpoint}`;
            
            const res = await fetch(url, {
                method,
                headers: {
                    ...(headers || {}),
                },
            })
            
            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }

            return res.json();
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error: true, message: error.message };
        }
    }
    
    // async getNestedParams(endpoint, option = {}) {
    //     try {
    //         const { headers, method = 'GET', params = {}} = option;
    //         const query = new URLSearchParams(params).toString();
    //         const url = `${this.baseUrl}/${endpoint}?${query}&`;

    //         const res = await fetch(url);

    //         if (!res.ok) {
    //             throw new Error(`HTTP Error: ${res.status}`)
    //         }

    //         return res.json();
    //     } catch (error) {
    //         console.error(`Error message: ${error.message}`);
    //         return { error: true, message: error.message };
    //     }
    // }
}
