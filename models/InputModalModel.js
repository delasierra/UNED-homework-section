/**
 * Created by csierra on 20/2/18.
 */

//todo create homework modal class
function InputModalModel(_callback, _minAnswerLength) {
    var _caller;

    function init() {
        setSaveButtonActions();
        addTextareaLenghtValidation(_minAnswerLength);
        addModalEvents ();
    }

    function setSaveButtonActions() {
        $( "#saveBtn" ).unbind();
        $('#saveBtn').click(function () {
            var inputText = $('#inputModalTextarea').val();
            _callback(_caller, inputText);
        });
    }

    this.show = function (caller, title, inputText, placeholder) {
        _caller = caller;
        checkTextareaLength(inputText, 5);
        $("#inputModalTitle").text(title);
        $('#inputModalTextarea').attr("placeholder", placeholder);
        $("#inputModalTextarea").val(inputText);
        $("#inputModal").modal("show");
    };

    this.hide = function () {
        $("#inputModal").modal("hide");
    };

    function addTextareaLenghtValidation(min) {
        $("#saveBtn").prop('disabled', true);
        $('#inputModalTextarea').on('keyup', function () {
            checkTextareaLength(this.value, min);
        });
    }

    function checkTextareaLength(text, min){
        if (text.length >= min) {
            $("#saveBtn").prop('disabled', false);
        } else {
            $("#saveBtn").prop('disabled', true);
            //TODO show info to user
            var charLeft = min - text.length;
        }
    }

    function addModalEvents (){
        $('#inputModal').on('shown.bs.modal', function () {
            $('#inputModalTextarea').focus()
        })
    }

    init();
}
