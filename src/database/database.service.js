export const findOne = async ({
    model, 
    filter = {} ,
    select  = '', 
    options = {}
}) =>{
    const { populate, sort, lean } = options
    let query = model.findOne(filter)

    if (select.length) {
        query = query.select(select)
    }
    if (sort) {
        query = query.sort(sort)
    }
    if (populate) {
        query = query.populate(populate)
    }
    if (lean) {
        query = query.lean()
    }

    return await query.exec()
}

export const find = async ({
    model, 
    filter = {} ,
    select  = '', 
    options = {}
}) =>{
    const { populate, sort, limit, skip, lean } = options
    let query = model.find(filter)

    if (select.length) {
        query = query.select(select)
    }
    if (sort) {
        query = query.sort(sort)
    }
    if (typeof skip === 'number') {
        query = query.skip(skip)
    }
    if (typeof limit === 'number') {
        query = query.limit(limit)
    }
    if (populate) {
        query = query.populate(populate)
    }
    if (lean) {
        query = query.lean()
    }

    return await query.exec()
}


export const findById = async ({
    model, 
    id, 
    select  = '', 
 populate = {}
}) =>{

    let query = model.findById(id)

    if (select.length) {
        query = query.select(select)
    }
    if (populate) {
        query = query.populate(populate)
    }
   
    return await query.exec()
}


export const findByIdAndUpdate = async ({
    model, 
    id,
    update = {},
    select  = '',
    options = {}
}) =>{
    const { populate, lean, ...updateOptions } = options
    let query = model.findByIdAndUpdate(id, update, { new: true, ...updateOptions })

    if (select.length) {
        query = query.select(select)
    }
    if (populate) {
        query = query.populate(populate)
    }
    if (lean) {
        query = query.lean()
    }

    return await query.exec()
}


export const findByIdAndDelete = async ({
    model, 
    id, 
    select  = '',
    options = {}
    
}) =>{
    const { populate, lean } = options
    let query = model.findByIdAndDelete(id)

    if (select.length) {
        query = query.select(select)
    }
    if (populate) {
        query = query.populate(populate)
    }
    if (lean) {
        query = query.lean()
    }

    return await query.exec()
}


export const insertOne = async ({
    model, 
    data = {}
}) =>{
    return await model.create(data)
}


export const insertMany = async ({
    model, 
    data = [] 
}) =>{
    return await model.insertMany(data)
}
