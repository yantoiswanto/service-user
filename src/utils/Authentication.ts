import bcrypt from 'bcrypt';

class Authentication {
    public static passwordHash = async (password: string): Promise<string> => {
        return await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    public static passwordCompare = async (password: string, hashPassword: string): Promise<boolean> => {
        let result = await bcrypt.compareSync(password, hashPassword);
        return result;
    }
}

export default Authentication;