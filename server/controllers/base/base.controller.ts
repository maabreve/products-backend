/**
 * Generic base controller class 
 * CRUD entity operations
 */
import express = require("express");
import * as httpStatus from 'http-status';
import { IService } from '../../services/base/iservice';

export class BaseController<T> {
    protected _baseService: IService<T>;

    constructor(baseService: IService<T>) {
        this._baseService = baseService;
    }

    protected _sendReponse = (res: any, statusCode: any, data: any) => {
        res.status(statusCode).json(data)
    }

    public getAll(req: express.Request, res: express.Response) {
        this._baseService.getAll()
            .then(item =>{
                this._sendReponse(res, httpStatus.OK, item)}
            )
            .catch(err => console.error.bind(console, `Error ${err}`))
    }

    public getAllPaginated(req: express.Request, res: express.Response) {
        const page = req.params.page;
        const itemsPerPage = req.params.itemsPerPage;
        
        this._baseService.getAllPaginated(page, itemsPerPage)
            .then(item =>{
                this._sendReponse(res, httpStatus.OK, item)}
            )
            .catch(err => console.error.bind(console, `Error ${err}`))
    }

    public getById(req: any, res: any) {
        const _id = { id: req.params.id };
        if (!_id) {
            this._sendReponse(res, httpStatus.OK, 'Not found!');
        } else {
            this._baseService
                .getById(_id.id)
                .then(items => this._sendReponse(res, httpStatus.OK, items))
                .catch(err => console.error.bind(console, `Error ${err}`))
        }
    }

    create(req: express.Request, res: express.Response) {
        console.log(req.body);
        this._baseService
            .create(req.body)
            .then(items => this._sendReponse(res, httpStatus.CREATED, items))
            .catch(err => console.error.bind(console, `Error ${err}`))
    }

    update(req: express.Request, res: express.Response) {
        if (!req.body._id) {
            this._sendReponse(res, httpStatus.OK, 'Item not found!');
        } else {
            console.log('xaaaaa', req.body)
            this._baseService
                .update(req.body._id, req.body)
                .then(items => this._sendReponse(res, httpStatus.CREATED, items))
                .catch(err => console.error.bind(console, `Error ${err}`))
        }
    }

    delete(req: express.Request, res: express.Response) {
        const _id = { id: req.params.id };
        if (!_id) {
            this._sendReponse(res, httpStatus.OK, 'Item not found!');
        } else {
            this._baseService
                .delete(_id.id)
                .then(items => this._sendReponse(res, httpStatus.OK, _id.id))
                .catch(err => console.error.bind(console, `Error ${err}`))
        }
    }
}
