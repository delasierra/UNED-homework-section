/**
 * Created by csierra on 15/3/18.
 */
/**
 * Created by csierra on 21/2/18.
 */
//TODO animations

function ListGeneratorController(data, _existingData, _minItems) {
    StepModel.call(this); //extending from StepModel

    var _self = this;
    var _data = data;
    var _inputModal = null;
    var _listItems = [];
    var _values;


    this.init = function () { //triggered from parent Class
        deleteItem(0);
        _values = [];
        _inputModal = new InputModalController(modalCallback);
        addGeneratorButton();
        selectExistingData(_existingData);
    };

    function selectExistingData(existingData) {
        if (existingData.length > 0) {
            for (var i = 0; i < existingData.length; i++) {
                createNewItem(existingData[i].extra1);
            }
            stepCompleted();
        }
    }

    function addGeneratorButton() {
        _inputModal.setElement($('#listGeneratorBtn'), getPlaceholder(0));
    }

    function createNewItem(text) {
        //TODO animation
        _listItems.push(text);

        var itemId = _listItems.length;
        var indexElement = '<div class="index"><h3>' + itemId + '</h3></div>';
        var answerElement = '<div class="answer">' + text + '</div>';
        var li = $('<li></li>');

        li.append(indexElement);
        li.append(answerElement);
        $('#listContainer').append(li);
        saveData(text);

        return li;


    }

    function deleteItem(id) {
        //TODO delete item when clicking on itself (show button/popover on rollover)
        $("#listContainer li").eq(id).remove();
    }

    function stepCompleted() {
        if (_values.length >= _minItems) {
            _self.updateNavigationButtons(true);
        } else {
            _self.updateNavigationButtons(false);
        }
    }

    function getPlaceholder(id) {
        return _data[id].placeholder;
    }

    //event handlers
    function modalCallback(caller, msg) {
        if (msg) {
            _inputModal.hideModal();
            _inputModal.displayAnswer(createNewItem(msg), msg);
            stepCompleted();
        } else {
            //do nothing
        }
    }

    function saveData(msg) {
        _values.push(msg);
        _self.saveArrayHiddenField(_values);
    }
}

Static.inheritPrototype(ListGeneratorController, StepModel);