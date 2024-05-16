import { Request, Response, } from 'express';
import { entityManager } from '../startup/database';
import { Admin } from '../entities/admin'
import jwt from 'jsonwebtoken';
import passwordHash from 'password-hash';
const adminSecreteKey = 'JWT_ADMIN_SECRETE_KEY';


class AuthController {
    constructor() { }


    adminLogin = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const adminRepository = entityManager.getRepository(Admin);
            const admin = await adminRepository.findOne({ where: { email: email } });
            if (!admin) return res.status(401).send('admin not exist');
            const validPassword = passwordHash.verify(password, admin.password);
            if (!validPassword) return res.status(404).send("Invalid password");
            const adminId = admin.id;
            const token = jwt.sign({ id: adminId }, adminSecreteKey);//,{expiresIn:"10m"}
            return res.status(200).send({ message: "admin login successfully", data: admin, adminToken: token })
        }
        catch (error: any) {
            res.status(404).send({ message: "error", error: error.message });
        }
    }


}
const authController = new AuthController;
export default authController;