import { Request, Response } from "express";
import { Customer } from "../entities/customer";
import { Inbox } from "../entities/inbox";
import { entityManager } from "../startup/database";


class InboxController {
    constructor() { }

    SaveEmailAndCustomer = async (req: Request, res: Response) => {
        try {
            const { first_name, last_name, email, subject, body } = req.body;

            const inboxRepository = entityManager.getRepository(Inbox);

            const customer = new Customer();
            customer.first_name = first_name;
            customer.last_name = last_name;
            customer.email = email;
            customer.created_at = new Date();
            customer.updated_at = new Date();

            const inbox = new Inbox();
            inbox.subject = subject;
            inbox.body = body;
            inbox.customer = customer;
            inbox.email = email;
            inbox.created_at = new Date();
            inbox.updated_at = new Date();

            const savedInbox = await inboxRepository.save(inbox)
            return res.status(200).send({ "message": "Thank you, Our team will contact you soon!", inboxData: savedInbox })
        } catch (error: any) {
            return res.status(400).send({ "error": error.message })
        }
    }


    GetEmailAndCustomer = async (req: Request, res: Response) => {
        try {
            const inboxRepository = entityManager.getRepository(Inbox);
         
            const data = await inboxRepository.find({
                relations: ['customer'],
                where: { status: false },
                order: { created_at: "DESC" } })   //get data in DESC order
            res.status(200).send({ "message": "data find successfully", data: data });

        } catch (error: any) {
            res.status(400).send({ "message": error.message })

        }
    }
    GetEmailAndCustomerByStatus = async (req: Request, res: Response) => {
        try {
            const inboxRepository = entityManager.getRepository(Inbox);
            const FindOptions = {
                relations: ['customer'],
                where: { status: true }
            }
            const data = await inboxRepository.find(FindOptions)
            res.status(200).send({ "message": "data find successfully", data: data });

        } catch (error: any) {
            res.status(400).send({ "message": error.message })

        }
    }
    GetEmailbyId = async (req: Request, res: Response) => {
        try {
            const emailId = parseInt(req.params.id);
            const inboxRepository = entityManager.getRepository(Inbox);
            const FindOptions = {
                where: { id: emailId },
                relations: ['customer']

            }
            const data = await inboxRepository.findOne(FindOptions);
            res.status(200).send({ "message": "data find successfully", data: data });

        } catch (error: any) {
            res.status(400).send({ "message": error.message })

        }
    }
    ChangeEmailStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body;
            const id = parseInt(req.params.id);
            const inboxRepository = entityManager.getRepository(Inbox);
            const result = await inboxRepository.update({ id: id }, { status: status });

            if (result.affected === 1) {
                res.status(200).json({ message: 'Email status updated successfully' });
            } else {
                res.status(404).json({ message: 'Email not found' });
            }

        } catch (error) {
            res.status(500).json({ message: 'An error occurred while updating the email status' });
        }

    };
    GetEmailbyEmail = async (req: Request, res: Response) => {
        try {
            const customerEmail = req.query.email as string
            console.log("customerEmail", customerEmail)
            const inboxRepository = await entityManager.getRepository(Inbox);
            const FindOptions = {
                where: { email: customerEmail },
                relations: ['customer']
            }
            const data = await inboxRepository.find(FindOptions);
            res.status(200).send({ "message": "data find successfully", data: data });

        } catch (error: any) {
            res.status(400).send({ "message": error.message })

        }
    }
}
const inboxController = new InboxController;
export default inboxController;