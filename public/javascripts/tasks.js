
function updateTask() {
var isChecked = $('#completed').prop('checked');
var taskId = $('#taskId').val();
$.ajax({
    type: 'POST',
    url: '/updateTask',
    data: { completed: isChecked, taskId: taskId },
    success: function(response) {
    console.log('Обновление выполнено успешно');
    },
    error: function(error) {
    console.error('Ошибка обновления: ', error);
    }
});
}
