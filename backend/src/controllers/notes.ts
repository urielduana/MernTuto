import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefine } from "../util/assertIsDefine";

export const getNotes: RequestHandler = async (req, res, next) => {
  const authUserId = req.session.userId;
  try {
    assertIsDefine(authUserId);
    const notes = await NoteModel.find({ userId: authUserId }).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const authUserId = req.session.userId;

  try {
    assertIsDefine(authUserId);
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid ID!");
    }
    const note = await NoteModel.findById(id).exec();
    if (!note) {
      throw createHttpError(404, "Note not found!");
    }
    if (!note.userId.equals(authUserId)) {
      throw createHttpError(401, "Unauthorized | Not your note!");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const authUserId = req.session.userId;

  try {
    assertIsDefine(authUserId);
    if (!title) {
      throw createHttpError(400, "Title is required!");
    }
    const newNote = new NoteModel({ userId: authUserId, title, text });
    const note = await newNote.save();
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  id: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const id = req.params.id;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const authUserId = req.session.userId;

  try {
    assertIsDefine(authUserId);

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid ID!");
    }

    if (!newTitle) {
      throw createHttpError(400, "Title is required!");
    }

    const note = await NoteModel.findById(id).exec();

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    if (!note.userId.equals(authUserId)) {
      throw createHttpError(401, "Unauthorized | Not your note!");
    }

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const authUserId = req.session.userId;

  try {
    assertIsDefine(authUserId);
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid ID!");
    }

    const note = await NoteModel.findById(id).exec();

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    if (!note.userId.equals(authUserId)) {
      throw createHttpError(401, "Unauthorized | Not your note!");
    }

    await note.deleteOne();

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
