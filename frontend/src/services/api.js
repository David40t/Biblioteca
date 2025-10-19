const API = 'http://localhost:8000/api/';

export async function getUsers() {
    const res = await fetch(`${API}users`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

export async function getAuthors() {
    const res = await fetch(`${API}authors`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

export async function getGenders() {
    const res = await fetch(`${API}genders`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

export async function getBooks() {
    const res = await fetch(`${API}books`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

export async function getLoans(){
    const res = await fetch(`${API}loans`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

export async function getUser(id) {
    const res = await fetch(`${API}users/${id}`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

export async function getAuthor(id) {
    const res = await fetch(`${API}authors/${id}`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

export async function getGender(id) {
    const res = await fetch(`${API}genders/${id}`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

export async function getBook(id) {
    const res = await fetch(`${API}books/${id}`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

export async function getLoan(id) {
    const res = await fetch(`${API}loans/${id}`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

export async function createUser(user) {
    const res = await fetch(`${API}users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al crear el usuario');
    }
    return res.json();
}

export async function createAuthor(author) {
    const res = await fetch(`${API}authors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(author),
    });
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al crear el autor');
    }
    return res.json();
}

export async function createGender(gender) {
    const res = await fetch(`${API}genders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gender),
    });
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al crear el género');
    }
    return res.json();
}

export async function createBook(book) {
    const res = await fetch(`${API}books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al crear el libro');
    }
    return res.json();
}

export async function createLoan(loan) {
    const res = await fetch(`${API}loans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loan),
    });
    // if (!res.ok) throw new Error(res.statusText);
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al crear el préstamo');
    }
    return res.json();
}

export async function updateUser(user, id) {
    const res = await fetch(`${API}users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al actualizar el usuario');
    }
    return res.json();
}

export async function updateAuthor(author, id) {
    const res = await fetch(`${API}authors/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(author),
    });
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

export async function updateGender(gender, id) {
    const res = await fetch(`${API}genders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gender),
    });
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al actualizar el género');
    }
    return res.json();
}

export async function updateBook(book, id) {
    const res = await fetch(`${API}books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    }); 
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al actualizar el libro');
    }
    return res.json();
}

export async function updateLoan(loan, id) {
    const res = await fetch(`${API}loans/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loan),
    }); 
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al actualizar el préstamo');
    }
    return res.json();
}

export async function deleteUser(id) {
    const res = await fetch(`${API}users/${id}`, {
        method: 'DELETE',
    }); 
    if (!res.ok) throw new Error(res.statusText);
    return true;
}

export async function deleteAuthor(id) {
    const res = await fetch(`${API}authors/${id}`, {
        method: 'DELETE',
    }); 
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al eliminar el autor');
    }
    return true;
}

export async function deleteGender(id) {
    const res = await fetch(`${API}genders/${id}`, {
        method: 'DELETE',
    }); 
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al eliminar el género');
    }
    return true;
}

export async function deleteBook(id) {
    const res = await fetch(`${API}books/${id}`, {
        method: 'DELETE',
    }); 
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al eliminar el libro');
    }
    return true;
}

export async function getBooksLoans() {
    const res = await fetch(`${API}stats/books_loans`);
    if(!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al obtener los libros con préstamos');
    }
    return res.json();
}

export async function getUsersLoans() {
    const res = await fetch(`${API}stats/users_loans`);
    if(!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al obtener los usuarios con préstamos');
    }
    return res.json();
}

export async function getLoanDefeated() {
    const res = await fetch(`${API}stats/loan_defeated`);
    if(!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al obtener los préstamos vencidos');
    }
    return res.json();
}

export async function getTopBooks() {
    const res = await fetch(`${API}stats/books_more_loans_top_5`);
    if(!res.ok){
        const error = await res.json();
        throw new Error(error.error || 'Error al obtener los libros más prestados');
    }
    return res.json();
}