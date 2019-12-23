// Todoに割り当てる最新の番号を保持する。
var todoIdx = 0;

// Todoのユーザインタフェースの表示を切り替える。
function switchEdit(editFlag, eventTarget) {

    var display = null;
    var editing = null;
    if (editFlag) {
        display = "none";
        editing = "inline-block";
    } else {
        display = "inline-block";
        editing = "none";
    }

    // Todoの表示関連のユーザインタフェースの表示を切り替える。
    var todoEle = eventTarget.parentNode;
    var todoEditBtn = todoEle.getElementsByClassName("todo-list__edit-btn")[0];
    todoEditBtn.style.display = display;
    var todoDeleteBtn = todoEle.getElementsByClassName("todo-list__delete-btn")[0];
    todoDeleteBtn.style.display = display;
    var content = todoEle.getElementsByClassName("todo-list__content")[0];
    content.style.display = display;

    // Todoの編集関連のユーザインタフェースの表示を切り替える。
    var todoEditCommitBtn = todoEle.getElementsByClassName("todo-list__edit-commit-btn")[0];
    todoEditCommitBtn.style.display = editing;
    var todoEditCancelBtn = todoEle.getElementsByClassName("todo-list__edit-cancel-btn")[0];
    todoEditCancelBtn.style.display = editing;
    var editContent = todoEle.getElementsByClassName("todo-list__edit-content")[0];
    editContent.style.display = editing;

}

// Todoの内容の表示・入力領域を更新する。
function switchContent(eventTarget) {

    var todoEle = eventTarget.parentNode;
    var content = todoEle.getElementsByClassName("todo-list__content")[0];
    var editContent = todoEle.getElementsByClassName("todo-list__edit-content")[0];

    switch (eventTarget.getAttribute("class")) {
        case "todo-list__edit-btn":
            // Todo入力領域に、表示されたTodoの内容を反映する。
            editContent.value = content.textContent;
            break;
        case "todo-list__edit-commit-btn":
            // Todo入力領域の内容を、表示用のTodoの内容に反映する。
            content.textContent = editContent.value;
            break;
        case "todo-list__edit-cancel-btn":
            // Todo入力領域に、表示されたTodoの内容を反映する。
            editContent.value = content.textContent;
            break;
    }
}

// Todo要素を追加する。
function addTodo(todoIdx, content, todoList) {
    var newTodoIdx = todoIdx + 1;
    var todoElement = document.createElement("div");
    todoElement.setAttribute("class", "todo-list__todo");
    todoElement.setAttribute("data-todo-idx", newTodoIdx);
    
    // Todo要素を編集するボタンを作成する。
    var todoEditBtn = document.createElement("div");
    todoEditBtn.setAttribute("class", "todo-list__edit-btn");
    todoEditBtn.setAttribute("data-todo-idx", newTodoIdx);
    todoEditBtn.textContent = "edit";
    todoEditBtn.addEventListener("click", function(event) {
        switchEdit(true, event.target);
        switchContent(event.target);
    });
    todoElement.appendChild(todoEditBtn);

    // Todo要素の編集を確定するボタンを作成する。
    var todoEditCommitBtn = document.createElement("div");
    todoEditCommitBtn.setAttribute("class", "todo-list__edit-commit-btn");
    todoEditCommitBtn.setAttribute("data-todo-idx", newTodoIdx);
    todoEditCommitBtn.style.display = "none";
    todoEditCommitBtn.addEventListener("click", function(event) {
        switchEdit(false, event.target);
        switchContent(event.target);
    });
    todoEditCommitBtn.textContent = "commit";
    todoElement.appendChild(todoEditCommitBtn);

    // Todo要素の編集をキャンセルするボタンを作成する。
    var todoEditCancelBtn = document.createElement("div");
    todoEditCancelBtn.setAttribute("class", "todo-list__edit-cancel-btn");
    todoEditCancelBtn.setAttribute("data-todo-idx", newTodoIdx);
    todoEditCancelBtn.style.display = "none";
    todoEditCancelBtn.addEventListener("click", function(event) {
        switchEdit(false, event.target);
        switchContent(event.target);
    });
    todoEditCancelBtn.textContent = "cancel";
    todoElement.appendChild(todoEditCancelBtn);

    // Todo要素を削除するボタンを作成する。
    var todoDeleteBtn = document.createElement("div");
    todoDeleteBtn.setAttribute("class", "todo-list__delete-btn");
    todoDeleteBtn.setAttribute("data-todo-idx", newTodoIdx);
    todoDeleteBtn.textContent = "delete";
    todoDeleteBtn.addEventListener("click", function(event) {
        // 削除ボタンの親要素（Todo要素）を、Todo要素の親要素から削除する。
        var todoListEle = document.getElementsByClassName("todo-list")[0];
        var todoEle = event.target.parentNode;
        todoListEle.removeChild(todoEle);
    });
    todoElement.appendChild(todoDeleteBtn);
    
    // Todoの内容を表示する領域を作成する。
    var todoContent = document.createElement("div");
    todoContent.setAttribute("class", "todo-list__content");
    todoContent.setAttribute("data-todo-idx", newTodoIdx);
    todoContent.textContent = content;
    todoElement.appendChild(todoContent);

    // Todoの内容の入力項目を作成する。
    var todoEditContent = document.createElement("input");
    todoEditContent.setAttribute("class", "todo-list__edit-content");
    todoEditContent.setAttribute("data-todo-idx", newTodoIdx);
    todoEditContent.style.display = "none";
    todoEditContent.value = content;
    todoElement.appendChild(todoEditContent);
    
    // 作成したTodo要素を、Todo一覧要素に追加する。
    todoList.appendChild(todoElement);

    return newTodoIdx;
}

// 画面ロード時のイベント処理。
window.addEventListener("load", function() {

    // Todo追加ボタンのイベント処理を定義する。
    var todoAddBtn = document.getElementsByClassName("todo-input__addBtn")[0];
    todoAddBtn.addEventListener("click", function() {
        var todoContent = document.getElementsByClassName("todo-input__content")[0];
        var todoListElement = document.getElementsByClassName("todo-list")[0];
        todoIdx = addTodo(todoIdx, todoContent.value, todoListElement);
    });

});
