const User = require("../models/User");


exports.getAllUsers = (req, res) => {
    console.log("Fetching all users");

    User.findAll()
        .then(users => {

            console.log("Users fetched successfully:", users);
            if (!users || users.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }
            console.log("Users found:", users.length);
            // Optionally, you can format the user data before sending it
            users = users.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }));
            console.log("Formatted users:", users);
            // Send the list of users as a JSON response
            console.log("Sending users response");
            console.log("Response status code:", res.statusCode);
            console.log("Response headers:", res.getHeaders());
            console.log("Response body:", users);
            console.log("Response sent successfully");


            res.json(users);
        })
        .catch(err => {
            console.error("Error fetching users:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}

exports.getuserDetail = (req, res) => {
    const userId = req.params.userId;
    console.log(`Fetching user with ID: ${userId}`);

    User.findByPk(userId)
        .then(user => {
            if (!user) {
                console.log("User not found");
                return res.status(404).json({ message: "User not found" });
            }
            console.log("User found:", user);
            // Format the user data before sending it
            const formattedUser = {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
            console.log("Formatted user:", formattedUser);
            // Send the user details as a JSON response
            res.json(formattedUser);
        })
        .catch(err => {
            console.error("Error fetching user:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}


exports.updateUserDetail = (req, res) => {
    const userId = req.params.userId;
    const { username, email } = req.body;
    console.log(`Updating user with ID: ${userId}`);

    User.findByPk(userId)
        .then(user => {
            if (!user) {
                console.log("User not found");
                return res.status(404).json({ message: "User not found" });
            }
            // Update user details
            user.username = username || user.username;
            user.email = email || user.email;

            return user.save();
        })
        .then(updatedUser => {
            console.log("User updated successfully:", updatedUser);
            res.json({
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt
            });
        })
        .catch(err => {
            console.error("Error updating user:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}

exports.deleteUser = (req, res) => {
    const userId = req.params.userId;
    console.log(`Deleting user with ID: ${userId}`);

    User.destroy({ where: { id: userId } })
        .then(deletedCount => {
            if (deletedCount === 0) {
                console.log("User not found");
                return res.status(404).json({ message: "User not found" });
            }
            console.log("User deleted successfully");
            res.json({ message: "User deleted successfully" });
        })
        .catch(err => {
            console.error("Error deleting user:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}
