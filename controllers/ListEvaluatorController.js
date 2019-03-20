/**
 * Created by csierra on 16/3/18.
 */
function ListEvaluatorController(data, _existingData) {
    StepModel.call(this); //extending from StepModel

    var _self = this;
    var _data = data;
    var _inputModal = null;
    var _userAnswer = [];


    this.init = function () { //triggered from parent Class
        createAnswerHolders(_data);
        _inputModal = new InputModalController(modalCallback);
        addButtons(getListElement());
        displayExistingData(_existingData);
    };

    function displayExistingData(existingData) {
        if (existingData) {
            $('.question').parent().removeClass('question-active');
            $('.question').parent().addClass('answer-active');

            var groupedExistingData = getGroupedExistingData(existingData);
            for (var i = 0; i < groupedExistingData.length; i++) {
                _userAnswer[i] = {
                    id: groupedExistingData[i][0],
                    good: groupedExistingData[i][1],
                    bad: groupedExistingData[i][2]
                };
            }
            saveData(_userAnswer);
            stepCompleted();
        }
    }

    function getGroupedExistingData(existingData) {
        var groups = [];
        var i;
        var blockSize = 3; //N of elements per answer: solution, good things and bad things
        for (i = 0; i < existingData.length; i += blockSize) {
            groups.push(existingData.slice(i, i + blockSize));
        }
        return groups;
    }

    function addButtons(list) {
        for (var i = 0; i < list.length; i++) {
            var li = $(list).eq(i);
            var btnGood = $(li).find('.good-things');
            var btnBad = $(li).find('.bad-things');
            _inputModal.setElement(btnGood, getPlaceholder(btnGood));
            _inputModal.setElement(btnBad, getPlaceholder(btnBad));
        }
    }

    function stepCompleted() {
        _self.updateNavigationButtons(true);
    }

    function getPlaceholder(id) {
        return $(id).children('.question').text();
    }

    //event handlers
    function modalCallback(caller, msg) {
        if (msg) {
            _inputModal.hideModal();
            _inputModal.displayAnswer(caller, msg);

            updateAnswerObject(getAnswerId(caller.id), getCallerType(caller.id), msg);

            if (isStepCompleted()) {
                stepCompleted()
            }
        } else {
            //do nothing
        }
    }

    function isStepCompleted() {
        //TODO change logic
        for (var i = 0; i < data.length; i++) {
            if (!_userAnswer[i].good || !_userAnswer[i].bad) {
                return false;
            }
        }
        return true;
    }

    function createAnswerHolders(data) {
        for (var i = 0; i < data.length; i++) {
            _userAnswer.push(
                {
                    id: data[i].id,
                    good: data[i].extra2,
                    bad: data[i].extra3
                }
            );
        }
    }

    function updateAnswerObject(id, type, msg) {
        for (var i = 0; i < data.length; i++) {
            if (_userAnswer[i].id === id) {
                if (type === 'good') {
                    _userAnswer[i].good = msg;
                } else if (type === 'bad') {
                    _userAnswer[i].bad = msg;
                }
            }
        }
        saveData(_userAnswer);
    }

    function saveData(data) {
        var outputData = [];
        for (var i = 0; i < data.length; i++) {
            outputData.push(Object.values(_userAnswer[i]));
        }
        outputData = [].concat.apply([], outputData);
        _self.saveArrayHiddenField(outputData);
    }

    function getListElement() {
        return $('#listContainer').children('li');
    }

    function getCallerType(stringId) {
        if (stringId.indexOf('good') >= 0) {
            return 'good';
        } else {
            return 'bad';
        }
    }

    function getAnswerId(stringId) {
        return stringId.replace(/^\D+/g, '');
    }
}

Static.inheritPrototype(ListEvaluatorController, StepModel);