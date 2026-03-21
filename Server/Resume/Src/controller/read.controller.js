import logger from "../Config/logger.config.js";
import { resumeModel } from "../Models/resume.model.js";

// ! GET HEADER PART OF RESUME
export const getPerticularResume = async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
       logger.warn(`Resume Not Found`);
       return res.status(400).json({message:'Resume Not Found',success:false}); 
    }

    const resume = await resumeModel.findById(id);
    return res.status(200).json({ success: true, data: resume });
  } catch (error) {
    logger.error(`Error Geting Resume: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ! GET ALL RESUME INDIVIDUAL USER
export const getAllResume = async (req, res) => {
  try {
    const authId = req.header("x-auth-data");

    const resumes = await resumeModel.find({
      creator: { $in: authId },
    });

    return res.status(200).json({ success: true, data: resumes });
  } catch (error) {
    logger.error(`Error Geting Resume: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};