/**
 * Created by csierra on 14/2/18.
 *
 * This Model give the structure for each homework
 *
 */

function HomeworkModel() {
    var _self = this;
    var INTRO_MESSAGE = 'only_message';
    var INPUT_TEXT = 'input_text_lg';
    var LIST_GENERATOR = 'list_generator';
    var LIST_EVALUATOR = 'list_evaluator';
    var LIST_PICKER = 'list_picker';
    var BLOCK_PICKER = 'block_picker';
    var DATE_PICKER = 'date_picker';
    var SLIDEBAR = 'slidebar';
    var CIRCLES_PICKER = 'circles_picker';
    var STANDBY = 'standby';
    var WEEK_DAY_MENU = 'week_day_menu';
    var T2_2_TRIANGLE = 't2_2_triangle';
    var T7_2_PIRAMID = 't7_2_piramid';
    var SUMMARY = 'summary';
    var REGISTERS_TIMELINE = "registers_timeline";

    this.getStep = function (data) {
        HomeworkController.prototype.updateProgressbar(data.steps_current, data.steps_total);
        var existingData;
        var step = null;
        switch (data.page) {
            case INPUT_TEXT:
                step = new InputTextController(data.input[0]);
                break;

            case LIST_GENERATOR:
                // TODO add min number of items per list from backend
                step = new ListGeneratorController(data.input, data.extras, 2);
                break;

            case LIST_EVALUATOR:
                existingData = _self.convertStringIntoArray(data.input[0].answer_ids);
                step = new ListEvaluatorController(data.input[0].extras, existingData);
                break;

            case LIST_PICKER:
            case BLOCK_PICKER:
            case CIRCLES_PICKER:
                var isMultipleArray = data.input[0].isMultipleArray;
                var numberOfElements = Object.keys(data.input[0].array_close_questions).length;
                existingData = _self.convertStringIntoArray(data.input[0].answer_ids);
                step = new PickerController(numberOfElements, isMultipleArray, existingData);
                break;

            case DATE_PICKER:
                step = new DatePickerController(data.input[0].answer);
                break;

            case T2_2_TRIANGLE:
            case T7_2_PIRAMID:
                step = new MultiStepInputModalController(data.input, data.steps_current, data.subSteps, data.steps_total);
                HomeworkController.prototype.updateProgressbar(0, data.steps_total);
                break;

            case SLIDEBAR:
                existingData = _self.convertStringIntoArray(data.input[0].answer);
                step = new SlidebarController(data, existingData);
                break;

            case WEEK_DAY_MENU:
                step = new WeekDayMenuController(data.input);
                break;

            case REGISTERS_TIMELINE:
                step = new RegistersTimelineController(data);
                break;

            case SUMMARY:
                HomeworkController.prototype.updateNavigationButtons(true);
                HomeworkController.prototype.updateProgressbar(data, data.page, data.total_steps);
                return;
                break;

            case STANDBY:
                HomeworkController.prototype.updateNavigationButtons(true);
                return;
                break;

            // case INTRO_MESSAGE:
            default:
                HomeworkController.prototype.updateNavigationButtons(true);
                return;
                break;
        }
        addEventListeners(step);
        step.build();
        return step;
    };

    //Private
    function addEventListeners(step) {
        $(step).on(HomeworkEvents.BUILD, onStepBuilt);
        $(step).on(HomeworkEvents.AVATAR_UPDATE, onAvatarUpdate);
        $(step).on(HomeworkEvents.PROGRESSBAR_UPDATE, onProgressbarUpdate);
        $(step).on(HomeworkEvents.NAVIGATION_UPDATE, onNavigationUpdate);
        $(step).on(HomeworkEvents.SAVE, onSaveArrayHiddenField);
    }

    //event handlers
    function onAvatarUpdate(event, msg) {
        HomeworkController.prototype.updateAvatarMsg.call(this, msg);
    }

    function onProgressbarUpdate(event, stepsTotal, stepCurrent) {
        HomeworkController.prototype.updateProgressbar.call(this, stepsTotal, stepCurrent);
    }

    function onNavigationUpdate(event, isStepReady) {
        HomeworkController.prototype.updateNavigationButtons.call(this, isStepReady);
    }

    function onStepBuilt(event, msg) {
        // console.log (msg);
    }

    function onSaveArrayHiddenField(event, data) {
        $('#user_answer').val(_self.convertArrayIntoString(data));
    }
}

HomeworkModel.prototype.convertArrayIntoString = function (data) {
    return HomeworkController.prototype.convertArrayIntoString.call(this, data);
};

HomeworkModel.prototype.convertStringIntoArray = function (string) {
    return HomeworkController.prototype.convertStringIntoArray.call(this, string);
};
