/**
 * Created by csierra on 19/2/18.
 */

function InputTextController(data) {
    StepModel.call(this); //extending from StepModel

    var _data = data;
    var _textArea;
    var _self = this;


    this.init = function () {
        setTextArea();
        addInputExistingData(_data.answer);
    };

    function addInputExistingData(existingData) {
        if (existingData) {
            _textArea.val(existingData);
            saveText(_textArea.val());
            _self.updateNavigationButtons(true);
        }
    }

    function setTextArea() {
        getTextArea();
        addTextareaLenghtValidation(_textArea, 5);
        if (_textArea) {
            _textArea.attr("placeholder", _data.placeholder);
            _textArea.attr("name", _data.name_input);
            _textArea.attr("id", _data.id_input);
            _textArea.focus();
        }
    }

    function addTextareaLenghtValidation (textArea, min){
        $(textArea).on('keyup', function () {
            var len = this.value.length;
            if (len >= min) {
                _self.updateNavigationButtons(true);
            } else {
                _self.updateNavigationButtons(false);
            }
        });
    }

    function getTextArea() {
        $('.form-group').find("input[type=textarea], textarea").each(function (e) {
            if (!$(this).val()) {
                _textArea = $(this);
            }
        });
    }

    function saveText(value) {
        $('#user_answer').val(value);
    }
}

Static.inheritPrototype(InputTextController, StepModel);