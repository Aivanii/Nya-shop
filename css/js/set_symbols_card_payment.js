const nums = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])
const nums_quatrs = new Set([4, 9, 14])
document.querySelector("#card-number").addEventListener('keydown', function (e) {
    const cursorPosition = this.selectionStart;

    if (cursorPosition < this.value.length) {
        e.preventDefault();
    } else {
        if (!nums.has(this.value[[this.value.length - 1]])) {
            this.value = this.value.slice(0, this.value.length - 1)
        }
        if (nums_quatrs.has(this.value.length) && e.keyCode != 8) {
            this.value += " ";
        }
        if (e.keyCode == 8 && this.value[[this.value.length - 2]] == ' ') {
            this.value = this.value.slice(0, this.value.length - 1)
        }
    }

});
document.getElementById("card-number").addEventListener('paste', function (event) {
    event.preventDefault(); // Отключаем вставку
});

document.getElementById("card-number").addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Отключаем контекстное меню
});

document.getElementById("exp-date").addEventListener('keydown', function (e) {
    const cursorPosition = this.selectionStart;

    if (cursorPosition < this.value.length) {
        e.preventDefault();
    } else {
        if (!nums.has(this.value[[this.value.length - 1]])) {
            this.value = this.value.slice(0, this.value.length - 1)
        }
        if (this.value.length == 2 && e.keyCode != 8) {
            this.value += "/";
        }
        if (e.keyCode == 8 && this.value[[this.value.length - 2]] == '/') {
            this.value = this.value.slice(0, this.value.length - 1)
        }
    }

});
document.getElementById("exp-date").addEventListener('paste', function (event) {
    event.preventDefault(); // Отключаем вставку
});

document.getElementById("exp-date").addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Отключаем контекстное меню
});


document.getElementById("cvv").addEventListener('keydown', function (e) {
    const cursorPosition = this.selectionStart;
    if (!nums.has(this.value[[this.value.length - 1]])) {
        this.value = this.value.slice(0, this.value.length - 1)
    }

});
document.getElementById("cvv").addEventListener('paste', function (event) {
    event.preventDefault(); // Отключаем вставку
});

document.getElementById("cvv").addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Отключаем контекстное меню
});
