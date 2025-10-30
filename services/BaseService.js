export class BaseService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async get(endpoint, params = {}) {
        try {
            const query = new URLSearchParams(params).toString();
            const url = query ? `${this.baseUrl}/${endpoint}/?${query}` : `${this.baseUrl}/${endpoint}`;

            const res = await fetch(url)

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }

            return res.json();
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error:true, message: error.message};
        }
    }

    async getById(endpoint, id) {
        try {
            const res = await fetch(`${this.baseUrl}/${endpoint}/${id}`)
            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }


            return res.json();
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error:true, message: error.message};
        }
    }

    async create(endpoint, body) {
        try {
            const res = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }

            return res.json();
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error:true, message: error.message};
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

    async update(endpoint, method = 'PUT', body = {}) {
        try {
            
            const url = `${this.baseUrl}/${endpoint}/${body.id}`;
            const option = {
                method: method,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(body),
            }

            const res = await fetch(url, option);

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }

            return res.json();
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error:true, message: error.message};
        }
    }

    async delete(endpoint, id) {
        try {
            const res = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }

            return { success: true };
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error:true, message: error.message};
        }
    }

    async getFilter(endpoint, id, childEndpoint) {
        try {
            const url = `${this.baseUrl}/${endpoint}/${id}/${childEndpoint}`;
            const res = await fetch(url)

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }

            return res.json();
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error:true, message: error.message};
        }
    }

    async getNestedParams(endpoint, params = {}) {
        try {
            const query = new URLSearchParams(params).toString();
            const url = `${this.baseUrl}/${endpoint}/?${query}`;

            const res = await fetch(url)

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`)
            }

            return res.json();
        } catch (error) {
            console.error(`Error message: ${error.message}`);
            return { error:true, message: error.message};
        }
    }
}
