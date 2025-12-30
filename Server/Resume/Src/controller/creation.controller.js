import logger from "../Config/logger.config.js";
import { EXCHANGES, ROUTING_KEYS } from "../Constant/rabitmq.constant.js";
import { REDIS_KEYS } from "../Constant/redis.constant.js";
import { resumeModel } from "../Models/resume.model.js";
import { deleteCached } from "../Utils/cached.utils.js";
import { publishEvent } from "./../Config/rabitmq.config.js";
import axios from "axios";

// ! GET ALL RESUME
export const getAllResume = async (req, res) => {
  try {
    const resume = await resumeModel.find();
    return res.status(200).json({ success: true, data: resume });
  } catch (error) {
    logger.error(`Error Geting Resume: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ! Create Resume
export const createResume = async (req, res) => {
  try {
    const { title, color } = req.body;
    const authId = req.header("x-auth-data");

    const { data: creditResponse } = await axios.get(
      `${process.env.PROFILE_URL}/profile/credit/${authId}`
    );

    if (!creditResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Unable to fetch user credit",
      });
    }

    if (creditResponse.credit < 5) {
      return res.status(403).json({
        success: false,
        message: "Not enough credits to create resume",
      });
    }

    if (!title?.trim()) {
      logger.error(
        `Resume Title Not Found — Missing field 'title' in resume creation`
      );
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    if (!authId) {
      logger.error(`Resume Creator Not Found`);
      return res.status(400).json({
        success: false,
        message: "Something Went wrong",
      });
    }

    const resume = await resumeModel.create({ title, color, creator: authId });

    logger.info(`Resume Created Successfully with ID: ${resume._id}`);

    // ! PUBLISH A CHANEL TO PROFILE SERVICES TO UPDATE USER RESUME CREATION COUNT
    await publishEvent(
      EXCHANGES.PROFILE,
      ROUTING_KEYS.PROFILE.UPDATE_USER_RESUME_CREATION,
      { creator: authId, resumeId: resume._id } 
    );

    // ! DELET REDIS CACHING FILE
    await deleteCached(REDIS_KEYS.PROFILE_BY_AUTHID(authId));

    return res.status(201).json({
      success: true,
      message: "Resume created successfully",
      data: resume,
    });
  } catch (error) {
    logger.error(`Error Creating Resume: ${error.message}`);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ! create Header Part Of Resume
export const resumeHeader = async (req, res) => {
  try {
    const { name, number, portfolio, linkedin, email, github, id } = req.body;

    // ! fields that must required to creat resume header
    const requiredFields = { number, name, email, linkedin };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        logger.error(`Missing field '${key}' in resume header creation`);
        return res.status(400).json({
          success: false,
          message: `${key} is required`,
        });
      }
    }

    const resume = await resumeModel.findById(id);
    // ! resume not found
    if (!resume) {
      logger.error(`No resume found for resume id: ${id}`);
      return res.status(404).json({
        success: false,
        message: `Resume not found id: ${id}`,
      });
    }

    // ! Update Resume Header
    resume.name = name;
    resume.number = number;
    resume.email = email;
    resume.linkedin = linkedin;
    resume.portfolio = portfolio || "";
    resume.github = github || "";

    await resume.save();

    logger.info(`Resume header updated successfully for resume id: ${id}`);

    return res.status(200).json({
      success: true,
      message: "Resume header updated",
    });
  } catch (error) {
    logger.error(`Error Creating Header Part Of Resume: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ! create Summary Part Of Resume
export const resumeSummary = async (req, res) => {
  try {
    const { summary, id } = req.body;

    // ! fields that must required to create resume header
    if (!summary) {
      logger.error(`Missing field 'summary' in resume summary creation`);
      return res.status(400).json({
        success: false,
        message: `summary is required`,
      });
    }

    const resume = await resumeModel.findById(id);
    // ! resume not found
    if (!resume) {
      logger.error(`No resume found for resume id: ${id}`);
      return res.status(404).json({
        success: false,
        message: `Resume not found id: ${id}`,
      });
    }

    // ! Update Resume Header
    resume.summary = summary;

    await resume.save();

    logger.info(`Resume summary updated successfully for resume id: ${id}`);

    return res.status(200).json({
      success: true,
      message: "Resume summary updated",
    });
  } catch (error) {
    logger.error(`Error Creating Summary Part Of Resume: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ! Adding Education Details
export const resumeEducation = async (req, res) => {
  try {
    const { id, college, degree, location, start, end, cgpa } = req.body;

    // ! Required Fields
    const requiredFields = { id, college, degree, location, cgpa };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        logger.error(`Missing field '${key}' in resume education creation`);
        return res.status(400).json({
          success: false,
          message: `${key} is required`,
        });
      }
    }

    // !start & end MUST be valid dates
    if (!start || isNaN(Date.parse(start))) {
      logger.error(`Missing field start in resume education creation`);
      return res.status(400).json({
        success: false,
        message: "Start date is required",
      });
    }

    if (!end || isNaN(Date.parse(end))) {
      logger.error(`Missing field end in resume education creation`);
      return res.status(400).json({
        success: false,
        message: "End date is required",
      });
    }

    const resume = await resumeModel.findById(id);
    // ! resume not found
    if (!resume) {
      logger.error(`No resume found for resume id: ${id}`);
      return res.status(404).json({
        success: false,
        message: `Resume not found id: ${id}`,
      });
    }

    // ! Update Resume Header
    if (resume.education.length === 0) {
      resume.education.push({
        college,
        degree,
        location,
        start,
        end,
        cgpa,
      });
    } else {
      const index = 0;
      resume.education[index].college = college;
      resume.education[index].degree = degree;
      resume.education[index].location = location;
      resume.education[index].start = start;
      resume.education[index].end = end;
      resume.education[index].cgpa = cgpa;
    }

    await resume.save();

    logger.info(`Resume education updated successfully for resume id: ${id}`);

    return res.status(200).json({
      success: true,
      message: "Resume education updated",
    });
  } catch (error) {
    logger.error(
      `Error In Resume Education Update Controller: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ! Adding  Skill
export const resumeSkills = async (req, res) => {
  try {
    const { id, technical, tools } = req.body;

    // ! Required Fields
    const requiredFields = { technical, tools };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (value.length === 0) {
        logger.error(`Missing field '${key}' in resume skill creation`);
        return res.status(400).json({
          success: false,
          message: `${key} is required`,
        });
      }
    }

    const resume = await resumeModel.findById(id);
    // ! resume not found
    if (!resume) {
      logger.error(`No resume found for resume id: ${id}`);
      return res.status(404).json({
        success: false,
        message: `Resume not found id: ${id}`,
      });
    }

    resume.skills.technical = technical;
    resume.skills.tools = tools;

    await resume.save();

    logger.info(`Resume skill updated successfully for resume id: ${id}`);

    return res.status(200).json({
      success: true,
      message: "Resume skill updated",
      data: resume,
    });
  } catch (error) {
    logger.error(`Error In Resume Skill Update: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ! Adding Experience
export const resumeExperince = async (req, res) => {
  try {
    const { id, title, role, location, points,start,end } = req.body;

    const resume = await resumeModel.findById(id);

    if (!resume) {
      logger.error(`No resume found for resume id: ${id}`);
      return res.status(404).json({
        success: false,
        message: `Resume not found id: ${id}`,
      });
    }

    const requiredField = { title, role, location, points };

    for (const [key, value] of Object.entries(requiredField)) {
      if (!value) {
        logger.error(`Missing field '${key}' in resume Experience creation`);
        return res.status(400).json({
          success: false,
          message: `${key} is required`,
        });
      }
    }

    
    // !start & end MUST be valid dates
    if (!start || isNaN(Date.parse(start))) {
       logger.error(`Missing field start in resume education creation`);
      return res.status(400).json({
        success: false,
        message: "Start date is required",
      });
    }

    if (!end || isNaN(Date.parse(end))) {
      logger.error(`Missing field end in resume education creation`);
      return res.status(400).json({
        success: false,
        message: "End date is required",
      });
    }


    if (points.length < 5) {
      logger.error("Experience points exceed the allowed limit (max: 5)");
      return res.status(400).json({
        success: false,
        message: "Maximum of 5 Bbullet Points.",
      });
    }

    console.log(points.length);

    resume.experience = {
      title,
      role,
      start,
      end,
      location,
      points,
    };

    await resume.save();

    logger.info(`Resume Experience updated successfully for resume id: ${id}`);

    return res.status(200).json({
      success: true,
      message: "Resume Experience updated",
      data: resume,
    });
  } catch (error) {
    logger.error(`Error In Resume Experience Update: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ! Check if project is empty
const isProjectEmpty = (proj) => {
  const { name, about, start, end, points, techStack, live, github } = proj;

  const emptyPoints =
    !points ||
    points.length === 0 ||
    points.every((p) => !p || p.trim() === "");

  const emptyTech =
    !techStack ||
    (typeof techStack === "string" && techStack.trim() === "") ||
    (Array.isArray(techStack) && techStack.every((t) => !t || t.trim() === ""));

  return (
    (!name || name.trim() === "") &&
    (!about || about.trim() === "") &&
    (!start || start.trim() === "") &&
    (!end || end.trim() === "") &&
    emptyPoints &&
    emptyTech &&
    (!live || live.trim() === "") &&
    (!github || github.trim() === "")
  );
};

// ! Update Projects
export const updateProjects = async (req, res) => {
  try {
    const { projects, id } = req.body;

    if (!Array.isArray(projects)) {
      return res
        .status(400)
        .json({ success: false, message: "Projects must be an array" });
    }

    const resume = await resumeModel.findById(id);
    if (!resume) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }

    //! Remove any `count` or extra keys from incoming data
    const cleanProjects = projects.map((p) => {
      const { count, ...rest } = p;
      return rest;
    });

    //! Filter out empty projects
    const validProjects = cleanProjects.filter((p) => !isProjectEmpty(p));

    //! Always update the DB with valid projects
    resume.projects = validProjects;

    await resume.save();

    return res.status(200).json({
      success: true,
      message: "Projects updated successfully",
      data: resume.projects,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
