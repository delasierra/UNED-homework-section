/**
 * Created by csierra on 21/2/18.
 */
//TODO animations

function MultiStepInputModalController(_data, _mainStep, _totalSubsteps, _totalSteps) {
    StepModel.call(this); //extending from StepModel

    var _self = this;
    var _inputModal;
    var _currentStepIndex;


    this.init = function () { //triggered from parent Class
        _currentStepIndex = 1;
        _inputModal = new InputModalController(modalCallback);
        showNextStep();
        displayExistingData(_data);
    };

    function displayExistingData(existingData) {
        if (isExistingData(existingData)) {
            for (var i = 0; i < existingData.length; i++) {
                showStep(i + 1);
                _currentStepIndex++;
                displayAnswer(i + 1, _data[i].answer);
                saveData(i + 1, _data[i].answer);
            }
            _self.updateNavigationButtons(true);
        }
    }

    function isExistingData(existingData) {
        for (var i = 0; i < existingData.length; i++) {
            if(!_data[i].answer){
                return false;
            }
        }
        return true;
    }

    function showStep(id) {
        _inputModal.setElement($('#' + getStepId(id)), getPlaceholder(id - 1));
    }

    function showNextStep() {
        if (_currentStepIndex <= _totalSubsteps) {
            showStep(_currentStepIndex);
            // console.log(_currentStepIndex, _mainStep, _totalSteps, _currentStepIndex + _mainStep, _data);
            // _self.updateProgressbar(_currentStepIndex + _mainStep - 1, _totalSteps);
        } else {
            showEndStep(_totalSubsteps);
        }
    }

    function showEndStep(id) {
        _self.updateAvatar(_data[id - 1].input_message);
        _self.updateNavigationButtons(true);
    }

    function getPlaceholder(id) {
        return _data[id].placeholder;
    }

    function updateAvatrarMsg(id) {
        var inputMsg = _data[id].input_message;
        _self.updateAvatar(inputMsg);
    }

    //event handlers
    function modalCallback(caller, msg) {
        if (msg) {
            _inputModal.hideModal();
            displayAnswer(getStepIndex(caller.id), msg);
            saveData(getStepIndex(caller.id), msg);
            _self.updateProgressbar(_currentStepIndex + _mainStep - 1, _totalSteps);

            if (caller.id == getStepId(_currentStepIndex)) {
                updateAvatrarMsg(_currentStepIndex - 1);
                _currentStepIndex++;
                showNextStep();
            }
        } else {
            //do nothing
        }
    }

    function displayAnswer(id, msg) {
        //todo animations
        // console.log('- displayAnswer', id, msg, getStepId(id), $('#' + getStepId(id)));
        $('#' + getStepId(id)).removeClass('disabled');
        $('#' + getStepId(id)).removeClass('question-active');
        $('#' + getStepId(id)).addClass('answer-active');
        $('#' + getStepId(id)).find('.answer').text(msg);
    }

    function getStepId(id) {
        return 'step_' + id;
    }

    function getStepIndex(stringId) {
        return stringId.replace(/^\D+/g, '');
    }

    function saveData(id, msg) {
        // console.log('-- saveData', '#hidden_step' + id);
        $('#hidden_step' + id).val(msg);
    }

}

Static.inheritPrototype(MultiStepInputModalController, StepModel);