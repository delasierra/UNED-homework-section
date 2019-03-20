/**
 * Created by csierra on 20/2/18.
 */
//TODO animations

function PickerController(_numberOfElements, _isMultioption, _existingData) {
    StepModel.call(this); //extending from StepModel
    var _self = this;
    var _selection = [];

    this.init = function () { //triggered from parent Class
        selectExistingData(_existingData);
        setButtonsBehavior();
    };

    function selectExistingData(existingData) {
        if (existingData) {
            for (var i = 0; i < existingData.length; i++) {
                $('[value=' + existingData[i] + ']').select();
                selectOption(existingData[i]);
            }
        }
    }

    function setButtonsBehavior() {
        // $('input').change(function () {
        //     // onSelectOption($(this).val());
        //     onSelectOption($(this));
        // });
        console.log("_numberOfElements", _numberOfElements);
        for (var i = 0; i <= _numberOfElements; i++) {
            $("#item_" + i).on("click", function () {
                console.log("click");
                $(this).find('input').select();
                console.log("calling selection");
                onSelectOption($(this));
            });
        }
    }

    // OG
    // **************
    // function onSelectOption(caller) {
    //     if (!_isMultioption || _selection.length <= 0) {
    //         $('input').parent().addClass('unselected');
    //     }
    //     if ($(caller).hasClass("unselected")) {
    //         selectOption($(caller).find('input').val());
    //         console.log('condition NO active');
    //     } else {
    //         unselectOption($(caller).find('input').val());
    //         console.log('condition active');
    //     }
    //     console.log('onSelectOption', _selection);
    //     _self.saveArrayHiddenField(_selection);
    // }

    //WORKING VERSION
    //****************
    function onSelectOption(caller) {
        // console.log($(caller), $(caller).hasClass("active"));
        if (!_isMultioption || _selection.length <= 0) {
            $('input').parent().addClass('unselected');
            // _self.updateNavigationButtons(true);
        }


        if ($(caller).hasClass("unselected")) {
            // console.log('condition active');
            selectOption($(caller).find('input').val());
        } else {
            // console.log('condition NO active');
            unselectOption($(caller).find('input').val());
        }
        // console.log('onSelectOption', _selection);
        _self.saveArrayHiddenField(_selection);
    }

    // function onSelectOption(caller) {
    //
    //     if (!_isMultioption || _selection.length <= 0) {
    //         console.log("condition unselected");
    //         $('input').parent().addClass('unselected');
    //     }
    //     // if ($(caller).hasClass("unselected")) {
    //     if ($(caller).hasClass("active")) {
    //         // unselectOption($(caller).find('input').val());
    //         console.log('condition NO active');
    //     } else {
    //         // selectOption($(caller).find('input').val());
    //         console.log('condition active');
    //     }
    //     console.log('onSelectOption', _selection);
    //     _self.saveArrayHiddenField(_selection);
    // }

    function selectOption(value) {
        console.log('selectOption', value)
        var optionElement = $('[value=' + value + ']');
        $(optionElement).parent().removeClass('unselected');
        $(optionElement).parent().addClass('active');
        if (_isMultioption) {
            _selection.push(value);
        } else {
            _selection[0] = value;
        }
        updateNavigationButtons();
    }

    function unselectOption(value) {
        var optionElement = $('[value=' + value + ']');
        for (var i = 0; i < _selection.length; i++) {
            if (_selection[i] === value) {
                _selection.splice(i, 1);
                $(optionElement).parent().addClass('unselected');
                $(optionElement).parent().removeClass('active');
            }
        }
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        if (_selection.length < 1) {
            _self.updateNavigationButtons(false);
        } else {
            _self.updateNavigationButtons(true);
        }
    }
}

Static.inheritPrototype(PickerController, StepModel);