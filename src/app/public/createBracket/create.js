
let ELEMENT_ID = "bracketsViewerExample";
let SUBMIT_BUTTON = "submit";

function renderBracket(data) {
    document.getElementById(ELEMENT_ID).innerHTML = '';

    window.bracketsViewer.render({
        stages: data.stage,
        matches: data.match,
        matchGames: data.match_game,
        participants: data.participant,
    }, {
        selector: '#' + ELEMENT_ID,
        participantOriginPlacement: 'before',
        separatedChildCountLabel: true,
        showSlotsOrigin: true,
        showLowerBracketSlotsOrigin: true,
        highlightParticipantOnHover: true,
    });
}