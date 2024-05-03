const authModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (loginData) => {
    const { email, senha } = loginData;
    try {
        const user = await authModel.checkEmailExists(email);

        if (user.length <= 0) {
            throw new Error("Não existe um usário cadastrado com esse e-mail!");
        }

        const verifiedPassword = await bcrypt.compare(senha, user[0].senha);

        if (!verifiedPassword) {
            throw new Error("Senha Incorreta!");
        }

        const token = jwt.sign(
            { userId: user[0].id_usuario },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        const { senha: pass, ...data } = user[0];

        return { data, token };
    } catch (erro) {
        throw erro;
    }
};

module.exports = {
    loginUser,
};
