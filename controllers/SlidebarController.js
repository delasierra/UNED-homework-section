/**
 * Created by csierra on 21/2/18.
 */
//TODO

function SlidebarController(data, _existingData) {
    StepModel.call(this); //extending from StepModel

    var _self = this;
    var _data = data;
    var _sliderValues;
    var _closeQuestionsArray;

    this.init = function () { //triggered from parent Class
        _closeQuestionsArray = _data.input[0].array_close_questions;
        addSlider();
        selectExistingData(_existingData);
    };

    function selectExistingData(existingData) {
        if (existingData) {
            var value = getValueIndex(getOptionValues());
            $('#homeworkSlider').slider('setValue', value);
            stepCompleted(value);
        }
    }

    function addSlider() {
        _sliderValues = getOptionValues();
        var totalValues = _sliderValues.length - 1;
        $("#homeworkSlider").slider({min: 0, max: totalValues, value: totalValues / 2});
        $('#homeworkSlider').slider({
            formatter: function (value) {
                return _sliderValues[value];
            }
        }).slider('setValue', Math.floor(_sliderValues.length / 2));

        $("#homeworkSlider").on("slideStop", function (e) {
            stepCompleted(e.value)
        });
    }

    function getValueIndex(values) {
        for (var i = 0; i < values.length; i++) {
            if (values[i] == _existingData) {
                return i;
            }
        }
        return null;
    }

    function getOptionValues() {
        if (!_sliderValues) {
            _sliderValues = [];
            for (var key in _closeQuestionsArray) {
                _sliderValues.push(_closeQuestionsArray[key]);
            }
        }
        return _sliderValues;
    }

    function getOptionKeys() {
        return Object.keys(_closeQuestionsArray);
    }

    function stepCompleted(value) {
        saveUserAnswer(value);
        _self.updateNavigationButtons(true);
    }

    function saveUserAnswer(value) {
        $('#user_answer').val(getOptionKeys()[value]);
    }
}

Static.inheritPrototype(SlidebarController, StepModel);