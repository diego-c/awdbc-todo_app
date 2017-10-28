$(document).ready(assignTodos);

// fetch the todos and give an id for each one
function assignTodos() {
    $.getJSON('http://localhost:3000/api/todos/')
    .done(todos => {
        todos = todos.reverse();
        let lis = $('ul > li.todo');
        lis.each(function(i) {
            $(this).data('id', todos[i]['_id']);
        })        
    })
    .fail(err => {
        console.error('Database fetching error!\n'+err);
        alert('Sorry, could not fetch your todos. Please reload the page and try again :(');
    })
} 

$('input').on('keyup', function(e) {
    if (e.key === 'Enter' && $(this).val() !== "") {
        let todo = $(this).val();
        $.post({
            url: 'http://localhost:3000/api/todos/',
            data: {name: todo},
            crossDomain: true
        })
        .done(d => {
            let newTodo = $(`<li class="todo"><span>${todo}</span> <button>X</button></li>`);
            newTodo.data('id', d['_id']);
            $('#todo-wrapper > ul').prepend(newTodo);
        })
        .fail(err => {
            console.error('Database writing error!\n'+err);
            alert('Sorry, could not create your todo. Please try again :(');
        })
        $(this).val("");
    }
})

$('ul').on('click', 'button', function() {
    let toRemove = $(this).parent();
    
    $.post({
        url: 'http://localhost:3000/api/todos/' + toRemove.data('id') + '?_method=DELETE',
        crossDomain: true
    })
    .done(data => {
        toRemove.remove();
    })
    .fail(err => {
        console.error('Database deleting error!\n'+err);
        alert('Sorry, could not remove your todo. Please try again :(');
    })
})

function updateTodo() {
    let updatedTodo = $(this).parent();
    
    $.post({
    url: 'http://localhost:3000/api/todos/' + updatedTodo.data('id') + '?_method=PUT',
    crossDomain: true
    })
    .done(data => {
        $(this).toggleClass("completed");
    })
    .fail(err => {
        console.error('Database updating error!\n'+err);
        alert('Sorry, could not update your todo. Please try again :(');
    })    
}

$('ul').on('click', 'span', updateTodo)

// TODO: Edit todos on double click
/*
$('#todo-wrapper').on('dblclick', 'span', function() {
    let todoTxt = $(this).text();
    $(this).html(`<input value="${todoTxt}" placeholder="Edit your todo..." autofocus>`);
})
*/
