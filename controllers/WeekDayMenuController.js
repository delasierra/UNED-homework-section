/**
 * Created by csierra on 14/3/18.
 */
//TODO animations

function WeekDayMenuController(data, _isMultioption) {
    StepModel.call(this); //extending from StepModel
    var _data = data;
    var _self = this;
    var _selection = [];

    this.init = function () { //triggered from parent Class
        hideNavigationBtns();
        setButtonsBehavior();
    };

    function setButtonsBehavior() {

    }

    function onSelectOption(caller) {
        if (!_isMultioption || _selection.length <= 0) {
            $('input[type=radio]').parent().addClass('unselected');
        }
        selectOption(caller);
    }

    function selectOption(caller) {
        caller.parent().removeClass('unselected');
        if (_isMultioption) {
            _selection.push(caller.val());
        } else {
            _selection[0] = caller.val();
        }
        $('#user_answer').val(_selection);
    }

    function hideNavigationBtns() {
        // console.log('hideNavigationBtns');
        //TODO uncoment when finish implementation
        // _self.updateNavigationButtons(false, null, null, true);

        //TODO this is only for testing before data implementation
        _self.updateNavigationButtons(true);
        // $('#user_answer').val('test: I should send a date like so: 20/04/2000');
    }

    // function
}

Static.inheritPrototype(WeekDayMenuController, StepModel);