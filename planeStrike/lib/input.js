
function UserLayerInit(event) {
    document.onkeydown = function(event) {
        var PressedKey =  event.which || event.keyCode;
        KeyInput(PressedKey);
    }
}
