/**
 *  Created by pw on 2019-07-29 14:54.
 */

export const train: IField[] = [
  {
    name: 'E_system_火车票_乘车人姓名',
    type: 'text',
    editable: true,
    placeholder: '请输入乘车人姓名',
    label: '乘车人姓名',
    optional: true
  },
  {
    name: 'E_system_火车票_车次',
    type: 'text',
    editable: true,
    placeholder: '请输入车次',
    label: '车次',
    optional: true
  },
  {
    name: 'E_system_火车票_座位类型',
    type: 'text',
    editable: true,
    placeholder: '请选择席别',
    label: '席别',
    optional: true
  },
  {
    name: 'E_system_火车票_乘车时间',
    type: 'date',
    editable: true,
    placeholder: '请选择乘车时间',
    label: '乘车时间',
    withTime: true,
    optional: true
  },
  {
    name: 'E_system_火车票_上车车站',
    type: 'text',
    editable: true,
    placeholder: '请选择始发地',
    label: '始发地',
    optional: true
  },
  {
    name: 'E_system_火车票_下车车站',
    type: 'text',
    editable: true,
    placeholder: '请选择目的地',
    label: '目的地',
    optional: true
  },
  {
    name: 'E_system_火车票_金额',
    type: 'money',
    editable: true,
    placeholder: '请输入总金额',
    label: '总金额',
    isIgnore: true,
    optional: true
  },
  {
    name: 'E_system_火车票_号码',
    type: 'text',
    editable: true,
    placeholder: '请输入车票号',
    label: '车票号',
    optional: true
  }
]

export const airplane: IField[] = [
  {
    name: 'E_system_航空运输电子客票行程单_乘机人姓名',
    type: 'text',
    editable: true,
    placeholder: '请输入乘机人姓名',
    label: '乘机人姓名',
    optional: true
  },
  {
    name: 'E_system_航空运输电子客票行程单_航班号',
    type: 'text',
    editable: true,
    placeholder: '请输入航班号',
    label: '航班号',
    optional: true
  },
  {
    name: 'E_system_航空运输电子客票行程单_座位等级',
    type: 'text',
    editable: true,
    placeholder: '请选择席别',
    label: '席别',
    optional: true
  },
  {
    name: 'E_system_航空运输电子客票行程单_乘机时间',
    type: 'date',
    editable: true,
    placeholder: '请选择乘机时间',
    label: '乘机时间',
    withTime: true,
    optional: true
  },
  {
    name: 'E_system_航空运输电子客票行程单_填开日期',
    type: 'date',
    editable: true,
    placeholder: '请选择填开日期',
    label: '填开日期',
    withTime: false,
    optional: true
  },
  {
    name: 'E_system_航空运输电子客票行程单_出发站',
    type: 'text',
    editable: true,
    placeholder: '请输入出发站',
    label: '出发站',
    optional: true
  },
  {
    name: 'E_system_航空运输电子客票行程单_到达站',
    type: 'text',
    editable: true,
    placeholder: '请输入到达站',
    label: '到达站',
    optional: true
  },
  {
    name: 'E_system_航空运输电子客票行程单_金额',
    type: 'money',
    editable: true,
    placeholder: '请输入总金额',
    label: '总金额',
    isIgnore: true,
    optional: true
  },
  {
    name: 'E_system_航空运输电子客票行程单_票价',
    type: 'money',
    editable: true,
    placeholder: '请输入票价',
    label: '票价',
    isIgnore: true,
    optional: true
  },
  {
    name: 'E_system_航空运输电子客票行程单_税费',
    type: 'money',
    editable: true,
    placeholder: '请输入税费',
    label: '税费',
    isIgnore: true,
    optional: true
  },
  {
    name: 'E_system_航空运输电子客票行程单_燃油附加费',
    type: 'money',
    editable: true,
    placeholder: '请输入燃油附加费',
    label: '燃油附加费',
    isIgnore: true,
    optional: true
  },
  {
    name: 'E_system_航空运输电子客票行程单_保险费',
    type: 'money',
    editable: true,
    placeholder: '请输入保险费',
    label: '保险费',
    isIgnore: true,
    optional: true
  },
  {
    name: 'E_system_航空运输电子客票行程单_民航发展基金',
    type: 'money',
    editable: true,
    placeholder: '请输入民航发展基金',
    label: '民航发展基金',
    isIgnore: true,
    optional: true
  }
]

export const taxi: IField[] = [
  {
    name: 'E_system_出租车票_发票代码',
    type: 'text',
    editable: true,
    placeholder: '请输入发票代码',
    label: '发票代码',
    optional: true
  },
  {
    name: 'E_system_出租车票_发票号码',
    type: 'text',
    editable: true,
    placeholder: '请输入发票号码',
    label: '发票号码',
    optional: true
  },
  {
    name: 'E_system_出租车票_上车时间',
    type: 'date',
    editable: true,
    placeholder: '请选择上车时间',
    label: '上车时间',
    withTime: true,
    optional: true
  },
  {
    name: 'E_system_出租车票_下车时间',
    type: 'date',
    editable: true,
    placeholder: '请选择下车时间',
    label: '下车时间',
    withTime: true,
    optional: true
  },
  {
    name: 'E_system_出租车票_里程',
    type: 'text',
    editable: true,
    placeholder: '请输入里程',
    label: '里程',
    optional: true
  },
  {
    name: 'E_system_出租车票_金额',
    type: 'money',
    editable: true,
    placeholder: '请输入总金额',
    label: '总金额',
    isIgnore: true,
    optional: true
  },
  {
    name: 'E_system_出租车票_发票所在地',
    type: 'text',
    editable: true,
    placeholder: '请选择所在地',
    label: '所在地',
    optional: true
  }
]

export const bus: IField[] = [
  {
    name: 'E_system_客运汽车发票_发票代码',
    type: 'text',
    editable: true,
    placeholder: '请输入发票代码',
    label: '发票代码',
    optional: true
  },
  {
    name: 'E_system_客运汽车发票_发票号码',
    type: 'text',
    editable: true,
    placeholder: '请输入发票号码',
    label: '发票号码',
    optional: true
  },
  {
    name: 'E_system_客运汽车发票_时间',
    type: 'date',
    editable: true,
    placeholder: '请选择乘车时间',
    label: '乘车时间',
    withTime: true,
    optional: true
  },
  {
    name: 'E_system_客运汽车发票_出发车站',
    type: 'text',
    editable: true,
    placeholder: '请输入出发车站',
    label: '出发车站',
    optional: true
  },
  {
    name: 'E_system_客运汽车发票_达到车站',
    type: 'text',
    editable: true,
    placeholder: '请输入到达车站',
    label: '到达车站',
    optional: true
  },
  {
    name: 'E_system_客运汽车发票_金额',
    type: 'money',
    editable: true,
    placeholder: '请输入总金额',
    label: '总金额',
    isIgnore: true,
    optional: true
  },
  {
    name: 'E_system_客运汽车发票_姓名',
    type: 'text',
    editable: true,
    placeholder: '请输入乘车人姓名',
    label: '乘车人姓名',
    optional: true
  }
]

const Tolls: IField[] = [
  {
    name: 'E_system_过路费发票_发票代码',
    type: 'text',
    editable: true,
    placeholder: '请输入发票代码',
    label: '发票代码',
    optional: true
  },
  {
    name: 'E_system_过路费发票_发票号码',
    type: 'text',
    editable: true,
    placeholder: '请输入发票号码',
    label: '发票号码',
    optional: true
  },
  {
    name: 'E_system_过路费发票_时间',
    type: 'date',
    editable: true,
    placeholder: '请选择时间',
    label: '时间',
    withTime: true,
    optional: true
  },
  {
    name: 'E_system_过路费发票_入口',
    type: 'text',
    editable: true,
    placeholder: '请输入入口',
    label: '入口',
    optional: true
  },
  {
    name: 'E_system_过路费发票_出口',
    type: 'text',
    editable: true,
    placeholder: '请输入出口',
    label: '出口',
    optional: true
  },
  {
    name: 'E_system_过路费发票_金额',
    type: 'money',
    editable: true,
    placeholder: '请输入总金额',
    label: '总金额',
    isIgnore: true,
    optional: true
  }
]

const Quota: IField[] = [
  {
    name: 'E_system_定额发票_发票代码',
    type: 'text',
    editable: true,
    placeholder: '请输入发票代码',
    label: '发票代码',
    optional: true
  },
  {
    name: 'E_system_定额发票_号码',
    type: 'text',
    editable: true,
    placeholder: '请输入发票号码',
    label: '发票号码',
    optional: true
  },
  {
    name: 'E_system_定额发票_金额',
    type: 'money',
    editable: true,
    placeholder: '请输入总金额',
    label: '总金额',
    isIgnore: true,
    optional: true
  }
]

const others: IField[] = [
  {
    name: 'E_system_其他_日期',
    type: 'date',
    editable: true,
    placeholder: '请选择日期',
    label: '日期',
    optional: true
  },
  {
    name: 'E_system_其他_金额',
    type: 'money',
    editable: true,
    placeholder: '请输入总金额',
    label: '总金额',
    isIgnore: true,
    optional: true
  }
]

export const fieldConfig: Record<string, IField[]> = {
  system_火车票: train,
  system_航空运输电子客票行程单: airplane,
  system_出租车票: taxi,
  system_客运汽车发票: bus,
  system_过路费发票: Tolls,
  system_定额发票: Quota,
  system_其他: others
}

export interface IField {
  name: string
  type: string
  editable: boolean
  placeholder: string
  label: string
  optional: boolean
  withTime?: boolean
  isIgnore?: boolean
}
