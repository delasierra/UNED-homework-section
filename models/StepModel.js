/**
 * Created by csierra on 19/2/18.
 *
 * This is the model from witch every Step extends
 * @StepModel prototype has all common functionality among steps
 *
 */
function StepModel() {
  this._self = this;

  this.init = function() {
    //override
  };
}
//common to all steps
StepModel.prototype.build = function() {
  this.init();
  $(this).triggerHandler(HomeworkEvents.BUILD);
};

StepModel.prototype.getTotalSteps = function(data) {
  return HomeworkService.getTotalSteps(data.page, data.total_steps);
};

StepModel.prototype.updateAvatar = function(msg) {
  $(this).triggerHandler(HomeworkEvents.AVATAR_UPDATE, [msg]);
};

StepModel.prototype.updateProgressbar = function(customCurrentStep, totalSteps) {
  $(this).triggerHandler(HomeworkEvents.PROGRESSBAR_UPDATE, [customCurrentStep, totalSteps]);
};

StepModel.prototype.updateNavigationButtons = function(isStepReady) {
  $(this).triggerHandler(HomeworkEvents.NAVIGATION_UPDATE, [isStepReady]);
};

StepModel.prototype.saveArrayHiddenField = function(data) {
  $(this).triggerHandler(HomeworkEvents.SAVE, [data]);
};

StepModel.prototype.convertArrayIntoString = function(data) {
  return HomeworkModel.prototype.convertArrayIntoString.call(this, data);
};

StepModel.prototype.convertStringIntoArray = function(string) {
  return HomeworkModel.prototype.convertStringIntoArray.call(this, string);
};

StepModel.prototype.showError = function(currentMsg, alertMsg) {
  //todo change avatar style
  //todo add animations
  //todo timer to show again original text
  AvatarApi.showErrorMessage(msg);
  // $( this ).triggerHandler( HomeworkEvents.AVATAR_UPDATE, [ msg ] );
};
