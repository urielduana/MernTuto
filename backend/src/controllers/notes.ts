import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid ID!");
    }
    const note = await NoteModel.findById(id).exec();
    if (!note) {
      throw createHttpError(404, "Note not found!");
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

  try {
    if (!title) {
      throw createHttpError(400, "Title is required!");
    }
    const newNote = new NoteModel({ title, text });
    const note = await newNote.save();
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};
