/**
 * Created by csierra on 14/3/18.
 */
//TODO animations

function InputModalController(_callback) {
    var _inputModal;

    function init() {
        _inputModal = new InputModalModel(_callback, 5);
    }

    this.setElement = function (caller, placehoderTxt) {
        setButtonAction(caller, placehoderTxt);
        displayQuestion(caller);
    };

    this.hideModal = function () {
        _inputModal.hide();
    };

    this.saveUserAnswer = function (id, msg) {
        $('#hidden_step' + id).val(msg);
    };

    this.displayAnswer = function (container, msg) {
        //todo animations
        $(container).removeClass('question-active');
        $(container).addClass('answer-active');
        $(container).find('.answer').text(msg);
    };

    function displayQuestion(container) {
        //todo animations
        $(container).removeClass('disabled');
        $(container).addClass('question-active');
    }

    function setButtonAction(caller, placeholder) {
        $(caller).click({ placeholder: placeholder }, onClickStep);
    }

    function onClickStep(e) {
        var caller = e.currentTarget;
        var placeholder = e.data.placeholder;
        var question = $(caller).find(".question").text();
        var answer = $(caller).find('.answer').text();
        _inputModal.show(caller, question, answer, placeholder);
    }

    init();
}