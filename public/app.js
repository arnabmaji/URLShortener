$(document).ready(() => {
    const button = $('#button');
    const buttonText = $('#btn-text');
    const spinner = $('#spinner');
    button.click(() => {
        const keyValue = $('#key').val();
        const urlValue = $('#url').val();
        if (keyValue === "" || urlValue === "") {
            showSnackbar('All fields are required!');
            return;
        }

        $.ajax({
            url: '/',
            method: 'POST',
            data: {
                key: keyValue,
                url: urlValue
            },
            beforeSend: function () {
                buttonText.text('Loading...');
                spinner.removeClass('d-none');
                button.attr('disabled');
            },
            complete: function (response) {
                showSnackbar(response.responseText);
                buttonText.text('Create');
                spinner.addClass('d-none');
                button.attr('enabled');
            }
        })
    });
});

function showSnackbar(message) {
    // Get the snackbar DIV
    const snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = message;
    // Add the "show" class to DIV
    snackbar.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}