function homeController($stateParams) {
    var ctrlName = $stateParams.type + "Controller";
    return ctrlName;
}