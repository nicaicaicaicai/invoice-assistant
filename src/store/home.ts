/**
 *  Created by pw on 2019-07-08 14:27.
 */
import { observable, action } from 'mobx'
import testHomeList from '../../test/homeList.json'
import { HomeModeIF } from '../interfaces/HomeIF'

export class HomeStore {
  @observable homeList: HomeModeIF[] = testHomeList

  constructor() {}

  @action getHomeList() {
    return this.homeList
  }

  @action saveInvoceData(data) {
    this.homeList.push(data)
  }
}

export default new HomeStore()

export type homeStore = HomeStore
