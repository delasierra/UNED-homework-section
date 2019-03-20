/**
 * Created by csierra on 14/2/18.
 *
 * This controller gives the right template and content to each step on each homework task
 *
 * @AvatarApi this method calls to Avtar functions to update and animate Avatar in small version
 **/
//TODO create Animation Class with all Homework animations

function HomeworkController() {
    var _self = this;
    var _homeworkModel;
    var _currentStep;
    var _data;
    var _hasRecord = false;
    // var _timer;
    // var _duration = 1000; //milliseconds

    this.getHasRecord = function () {
        return _hasRecord;
    };

    this.setHasRecord = function (value) {
        _hasRecord = value;
    };

    //triggered when backend respond
    this.loadStep = function (data) {
        _homeworkModel = null;
        _currentStep = null;
        //todo get ID from AJAX to control everything form here OR USE CLASSES
        $("#homework_step_container").html(data);
        // $("#previous_step_homework_" + id).show();
        // if (homework_current_step==homework_total_steps){
        //     $("#next_step_homework_" + id).hide();
        //     $("#back_homework_" + id).hide();
        //     $("#finish_homework_" + id).show();
        // }

    };

    //show step after loaded
    this.showStep = function (json) { //called from php page
        //show step specific logic
        _data = getJson(json);
        this.updateScreen(_data);

        _homeworkModel = new HomeworkModel();
        _currentStep = new _homeworkModel.getStep(_data);

        //ocultar/mostrar botones pagination
    };

    this.showErrorMsg = function (msg) {
        var currentMsg = $('.speech-bubble').text();
        AvatarApi.showMessage(msg);
        TweenMax.to($('.speech-bubble'), .3, {css: {className: '+=alert'}});
    };

    this.updateScreen = function (data) {
        //update screen
        this.updateNavigationButtons(false);
        this.updateAvatarMsg(data.message_initial);
        // this.updateProgressbar(data.step, data.total_steps, data.input);
        // this.updateProgressbar(data);
    };

    function getJson(json) {
        var json = JSON.parse(json);
        console.log(json);
        return json;
    }
}

HomeworkController.prototype.updateAvatarMsg = function (msg) {
    //TODO call animation
    AvatarApi.showMessage(msg);

    //TODO code this propertly
    // clearTimeout(_timer);
    $('.speech-bubble').removeClass('alert');
};


HomeworkController.prototype.updateProgressbar = function (stepCurrent, stepsTotal) {

    var currentStep = stepCurrent;
    var totalSteps = stepsTotal;

    var progress = (currentStep * 100) / (totalSteps);
    $('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress);
};


// HomeworkController.prototype.updateProgressbar = function (currentStep, totalSteps, dataInput) { //TODO add numberOfIntrSteps to function properties
/*HomeworkController.prototype.updateProgressbar = function (data, stepType, customCurrentStep) {
 var currentStep = data.step;
 var totalSteps = data.total_steps;
 var dataType = data.input[0] ? data.input[0].property : undefined;
 var introSteps = 2; //TODO substitute with NumberOfIntroSteps
 // var hasRecord = data.historicalData.length > 0;


 // introSteps
 // step
 // steps_current
 // subSteps
 // steps_total
 // total_steps
 // user_step
 // user_total_steps


 if (stepType !== 'INTRO') {
 console.log('-- THIS IS STEP NOT COUTING INTRO');
 currentStep -= introSteps;
 totalSteps -= introSteps;
 }

 if (customCurrentStep !== undefined) {
 console.log('-- THIS IS CUSTOM STEP');
 currentStep = customCurrentStep;
 }

 var progress = (currentStep * 100) / (totalSteps - 1);
 $('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress);
 };*/

HomeworkController.prototype.convertArrayIntoString = function (data) {
    return data.join('%___%');
};

HomeworkController.prototype.convertStringIntoArray = function (string) {
    if (string) {
        return string.split('%___%');
    }
    return null;
};

HomeworkController.prototype.showModal = function (title, content) {
// HomeworkController.prototype.showModal = function (modalId, title, content) {
    $('#homeworkModalTitle').html(title);
    $('#homeworkModalContent').html(content);
    $("#homeworkModal").modal();
};

// HomeworkController.prototype.updateNavigationButtons = function (isStepReady, step, totalSteps, hide) {
HomeworkController.prototype.updateNavigationButtons = function (isStepReady) {
    // TODO add animations
    // console.log('updateNavigationButtons = ', 'isStepReady:', isStepReady, 'step', step, 'totalSteps', totalSteps, 'hide', hide);

    if (isStepReady) {
        $('.btn-next').prop('disabled', false);
    } else {
        $('.btn-next').prop('disabled', true);
    }


    //Previous button
    // if (step <= 1) {
    //     //    TODO deactivate/hide previous btn
    // } else {
    //     //    TODO active/show previous btn
    // }
    //
    // //Next button
    // if (hide) {
    //     $('.btn-next').addClass('hidden');
    // } else if (step >= totalSteps || !isStepReady) {
    //     // TODO deactivate next btn
    //     $('.btn-next').prop('disabled', true);
    //
    // } else {
    //     // TODO show next btn
    //     $('.btn-next').prop('disabled', false);
    // }

};