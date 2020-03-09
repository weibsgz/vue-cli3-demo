import qs from 'qs'

/**
 * @param  {} sDate 任意类型日期
 * @param  {String} part 获取日期部分，0-全部，1-日期，2-时间
 * @param  {String} dDelimiter 日期分隔符，默认'-'
 * @param  {String} tDelimiter  时间分隔符，默认':'
 * @return String
 */
let dateFormat = (sDate, part = '0', dDelimiter = '-', tDelimiter = ':') => {
    let date = ''
    try {
        date = new Date(sDate)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        let h = date.getHours()
        let mm = date.getMinutes()
        let s = date.getSeconds()
        let result = `${y > 9 ? y : '0' + y}${dDelimiter}${m > 9 ? m : '0' + m}${dDelimiter}${d > 9 ? d : '0' + d} ${
      h > 9 ? h : '0' + h
    }${tDelimiter}${mm > 9 ? mm : '0' + mm}${tDelimiter}${s > 9 ? s : '0' + s}`
        if (part === '1') {
            return result.split(' ')[0]
        } else if (part === '2') {
            return result.split(' ')[1]
        } else {
            return result
        }
    } catch (err) {
        throw new Error('TypeError: sDate is invalid.')
    }
}

let handleFormData = data => {
        let result = []
        for (let key in data) {
            let obj = {
                label: data[key],
                value: key
            }
            result.push(obj)
        }
        return result
    }
    /**
     * @param  {string} url 导出url
     * @param  {Object} data 导出参数
     * @return void
     */
let exportData = (url, data) => {
    let elink = document.createElement('a')
    elink.setAttribute('class', 'del_flag')
    document.body.appendChild(elink)
    elink.style.display = 'block'
    elink.href = `${url}?${qs.stringify(data)}`
    elink.click()
    setTimeout(() => {
        let list = document.getElementsByClassName('del_flag')
        for (let i = 0; i < list.length; i++) {
            document.body.removeChild(list[i])
        }
    }, 1000)
}

let key2String = object => {
        for (const key in object) {
            if (typeof object[key] === 'number') {
                object[key] = object[key].toString()
            }
        }
        return object
    }
    // 为返回的数据增加 value 、 label 字段
let addKey = (ary, valueKey, labelkey) => {
        for (const item of ary) {
            item.value = item[valueKey]
            item.label = item[labelkey]
        }
        return ary
    }
    // 由一个组件，向下找到所有指定的组件
function findComponentsDownward(context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child)
        const foundChilds = findComponentsDownward(child, componentName)
        return components.concat(foundChilds)
    }, [])
}
// 由一个组件，向上找到最近的指定组件
function findComponentUpward(context, componentName) {
    let parent = context.$parent
    let name = parent.$options.name

    while (parent && (!name || [componentName].indexOf(name) < 0)) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
    }
    return parent
}
export {
    dateFormat,
    handleFormData,
    exportData,
    key2String,
    addKey,
    findComponentsDownward,
    findComponentUpward
}