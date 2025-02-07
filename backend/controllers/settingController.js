import { Setting } from "../models/settingModel";

export const getSetting = async(req, res) => {
    const getsetting = req.params.id;

    try {
        const setting  = await Setting.findById(getsetting);
        return res.status(200).json(setting);
    } catch (error) {
            return res.status(400).json({ message: error.message }); 
    }
}

export const updateSetting = async (req , res) => {
    const updatesetting = req.params.id;

    try {
        const upset = await Setting.findByIdAndUpdate(req.params.id , req.body , {
            new:true
        })

        return res.status(200).json(upset);
    } catch (error) {
        return res.status(400).json({ message: error.message }); 
    }
}