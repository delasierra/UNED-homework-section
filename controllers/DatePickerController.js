/**
 * Created by csierra on 21/2/18.
 */
//TODO

function DatePickerController(_existingData) {
    StepModel.call(this); //extending from StepModel
    var _defaultDate;
    var _self = this;

    this.init = function () { //triggered from parent Class
        selectExistingData(_existingData);
        create();
        addListeners();
    };

    function selectExistingData(existingData) {
        if (existingData) {
            var dateArray = existingData.split("-");
            _defaultDate = new Date(dateArray[2], dateArray[1], dateArray[0], 00, 01);
            saveDate(existingData);
        }
    }

    function create() {
        // _defaultDate = new Date(2018, 04, 28, 00, 01);
        $('#dayPicker').datetimepicker({
            inline: true,
            minDate: new Date(),
            useCurrent: false,
            format: 'DD-MM-YYYY',
            defaultDate: _defaultDate,
            viewMode: 'days',
            icons: {
                time: 'glyphicon glyphicon-time',
                date: 'glyphicon glyphicon-calendar',
                up: 'glyphicon glyphicon-chevron-up',
                down: 'glyphicon glyphicon-chevron-down',
                previous: 'fa icon-prevArrow fa-2x',
                next: 'fa icon-nextArrow fa-2x',
                today: 'glyphicon glyphicon-screenshot',
                clear: 'glyphicon glyphicon-trash',
                close: 'glyphicon glyphicon-remove'
            }
        });
    }

    function addListeners() {
        $('#dayPicker').datetimepicker().on('dp.update', function (e) {
            //
        }).on('dp.hide', function (e) {
            //
        }).on('dp.show', function (e) {
            //
        }).on('dp.change', function (e) {
            if (e.date) {
                saveDate(e.date.format('DD-MM-YYYY'))
            }
        });
    }

    function saveDate(value) {
        $('#user_answer').val(value);
        _self.updateNavigationButtons(true);
    }

}

Static.inheritPrototype(DatePickerController, StepModel);