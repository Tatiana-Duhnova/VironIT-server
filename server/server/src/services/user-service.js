const add = async function (req) {
    const user = req.body;
    await user.save();
    const token = await user.generateAuthToken();
    return {user, token};
};

const getAllUsers = async function(){
    return await User.find({});
};

const update = async function(req){
    return await User.findByIdAndUpdate(req.params.id, req.body);
};

const del = async function(req){
    return await req.user.remove();
};

const getById = async function(req) {
    return await User.findById(req.params.id);
};
