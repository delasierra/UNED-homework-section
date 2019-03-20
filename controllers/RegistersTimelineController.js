/**
 * Created by csierra on 21/2/18.
 */
//TODO

function RegistersTimelineController (data) {
    StepModel.call(this); //extending from StepModel
    var _data = data;
    var _self = this;
    var _summaryData = _data.all_summaries;

    this.init = function(){ //triggered from parent Class
        //todo build animation
        //todo load summary template form PHP (renderpartial)
        // _self.updateNavigationButtons(true, undefined, undefined, true);
        formatBodyText();

    };

    function formatBodyText(){
        //todo go through loop
        var totalSummaries = _summaryData.length;
        for (var i = 0; i < totalSummaries; i++){
            // addSummaryBtnAction(i);
            var content = _self.convertStringIntoArray($('#body_'+i).text());
            // console.log(content);
            $('#body_'+i).text( content.join(", "));
        }
    }

    // function addSummaryBtnAction(id){
    //     //todo animation with delay for each register (include scrollspy?)
    //     //add one register
    //     $('#summaryBtn_'+id).click(onClickRegistry);
    //
    // }

    // function addSummaryBtnAction(id){
    //     //todo animation with delay for each register (include scrollspy?)
    //     //add one register
    //     $('#summaryBtn_'+id).click(onClickRegistry);
    //
    // }

    // function showSummary(data){
    //     //todo show modal with right summary template (renderpartial)
    //     //todo control summary content from JS specific model (loaded at the begining of this class)
    //     //todo call InputModalModel tool with the right data
    //     // var summaryController = new SummaryController(data);
    //     // summaryController.init();
    //     // $("#summaryModalTitle").text(data.title);
    //     // $("#summaryModal").modal("show");
    // }

    // function addNewRegistry (){
    //     //todo call backend and start homework from beggining
    //     //todo ask @Manu to send var to trigger button in homework_unit
    //     $( this ).triggerHandler( HomeworkEvents.RESTART_HOMEWORK, [  ] );
    // }

    // function onClickRegistry (e){
    //     var btn = e.currentTarget;
    //     var summary = _summaryData[getSummaryIndex(btn.id)]; //= json with registry data;
    //     // console.log('++++++++', btn.id, getSummaryIndex(btn.id), summary.data, summary.title);
    //     showSummary(summary);
    // }

    // function onClickCloseSummary (e){
    //     $("#summaryModal").modal("hide");
    // }

    // function getSummaryIndex(stringId){
    //     return stringId.replace( /^\D+/g, '');
    // }

}

Static.inheritPrototype(RegistersTimelineController, StepModel);