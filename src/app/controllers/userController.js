exports.getUserById = async (req, res) => {
    const { id } = req.params;
    res.send(`User with ID: ${id} got`);
};

exports.createUser = async (req, res) => {
    const { id } = req.params;
    res.send(`User with ID: ${id} created`);
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    res.send(`User with ID: ${id} updated`);
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    res.send(`User with ID: ${id} deleted`);
};