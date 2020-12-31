const __module = require('../modules/server_side');
let __server = __module.default.axios;
let GET = __module.default.state.GET;
let URI = __module.default.state.baseURI;
let query = __module.default.query;
let POST = __module.default.state.POST;

let state = {
    state1: "update"
}
export function READ(){
    const API_READ = __server({
        method: GET,
        url: URI + "Datareader/read"
    });
    return API_READ;
}

export function CREATE(tasker)
{
    var data = query.stringify(tasker);
    const API_CREATE = __server({
        method: POST,
        url: URI + "created/data-create", data
    });
    return API_CREATE;
}

export function CREATE_SPROC(tasker)
{
    const data = new FormData();
    data.append("firstname", tasker.firstname);
    data.append("lastname", tasker.lastname);
    data.append("email", tasker.email);
    data.append("comment", tasker.comment);
    data.append("state", "create_procedure");
    const API_SPROC_CREATE = __server({
        method: POST,
        url: URI + "created/data-create-form-data", data
    });
    return API_SPROC_CREATE;
}

export function UPDATE_SPROC(tasker, uid)
{
    const data = new FormData();
    data.append("firstname", tasker.firstname);
    data.append("lastname", tasker.lastname);
    data.append("email", tasker.email);
    data.append("comment", tasker.comment);
    const API_UPDATE_SPROC = __server({
        method: POST,
        url: URI + "update/data-update?id=" + uid + "&state=" + state.state1, data
    });
    return API_UPDATE_SPROC;
}

export function DELETE(uid)
{
    const config = {
        headers:{"Content-Type" : "text/html"}
    }
    const API_DELETE = __server({
        method: POST,
        url: URI + "delete/delete-data?id=" + uid, config
    });
    return API_DELETE;
}