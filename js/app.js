// Book Constructior - It will handle creating book objects
function Book (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}



// UI Constructor - Set of Prototype methods for UI
function UI () {

    // Add Book to list
    UI.prototype.addBookToList = function (book) {
        const list = document.getElementById('book-list');
        // Create Tr Element
        const row = document.createElement('tr');
        // Insert Cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#!" class="delete"><i class="far fa-trash-alt text-danger"></i></a></td>`;

        list.appendChild(row);
        console.log(row)
    }

    // Show alert
    UI.prototype.showAlert = function (message, className) {
        // Create Div
        const div = document.createElement('div');
        // Add Classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // get parent
        const cardBody = document.querySelector('.card-body');

        // card.appendChild(div);
        const bookForm = document.querySelector('#book-form');

        // // Insert Alert
        cardBody.insertBefore(div, bookForm);

        // auto remove after 3s
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    // Delete Book
    UI.prototype.deleteBook = function(target) {
        if (target.parentElement.classList.contains('delete')) {
            target.parentElement.parentElement.parentElement.remove();
        }
    }

    UI.prototype.clearFields = function () {
        document.getElementById('input-title').value = '';
        document.getElementById('input-author').value = '';
        document.getElementById('input-isbn').value = '';
    }

}





// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    
    // Get Input Values
    const 
    title = document.getElementById('input-title').value,
    author = document.getElementById('input-author').value,
    isbn = document.getElementById('input-isbn').value
    
    // Instantiate Book Object
    const book = new Book (title, author, isbn);

    // Instantiate UI Object
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Error Alert
        ui.showAlert('Please Fill in all fields', 'error');

    } else {
        // Success Alert
        ui.showAlert('Book Added', 'success');

        // Add Book to list
        ui.addBookToList(book);
        // console.log(book);

        // Clear Fields
        ui.clearFields();
    }
    
    e.preventDefault();
});

// Event Listnener for Delete book
document.getElementById('book-list').addEventListener('click', function (e) {

    // console.log('deleted')
    
    // Instantiate UI Object
    const ui = new UI();
    
    ui.deleteBook(e.target);

    // Show Alert
    ui.showAlert('Book removed!', 'success');

    e.preventDefault()
});