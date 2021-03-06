import Checkbox from '../../components/Checkbox'
import { vueTest } from '../utils'

describe('Checkbox', () => {
  let vm
  let check, checkLabel
  before(() => {
    vm = vueTest(Checkbox)
    check = vm.$('#check')
    checkLabel = vm.$('label[for=check]')
  })

  it('exists', () => {
    check.should.exist
    check.should.have.attr('type', 'checkbox')
  })

  it('is upgraded', () => {
    let span = vm.$('label[for=check] span:nth-child(2)')
    check.should.have.class('mdl-checkbox__input')
    checkLabel.should.have.attr('data-upgraded')
    .match(/MaterialCheckbox/)
    span.should.have.class('mdl-checkbox__label')
    .and.have.text('Check me')
  })

  it('is checked', () => {
    check.should.be.checked
    checkLabel.should.have.class('is-checked')
  })

  it('can be unchecked', (done) => {
    vm.check = false
    vm.nextTick()
    .then(() => {
      check.should.not.be.checked
      checkLabel.should.not.have.class('is-checked')
      vm.check = true
      return vm.nextTick()
    }).then(() => {
      check.should.be.checked
      checkLabel.should.have.class('is-checked')
      return vm.nextTick()
    }).then(done, done)
  })

  it('can be disabled', (done) => {
    check.disabled.should.be.false
    check.should.not.have.a.attr('disabled')
    checkLabel.should.not.have.class('is-disabled')
    vm.disabled = true
    vm.nextTick()
    .then(() => {
      check.disabled.should.be.true
      check.should.have.a.attr('disabled')
      checkLabel.should.have.class('is-disabled')
      return vm.nextTick()
    }).then(done, done)
  })

  it('updates when disabled', (done) => {
    check.should.be.checked
    vm.check = false
    vm.nextTick()
    .then(() => {
      check.should.not.be.checked
      vm.check = true
      vm.disabled = false
      return vm.nextTick()
    }).then(done, done)
  })

  it('keeps user added classes', () => {
    vm.$('label[for=check-dyn]')
    .should.have.class('added-class')
  })

  it('can use an array', (done) => {
    let id0 = vm.$('#id-0')
    let id1 = vm.$('#id-1')
    let id2 = vm.$('#id-2')
    id0.should.not.be.checked
    id1.should.not.be.checked
    id2.should.not.be.checked
    vm.checks = ['id-0']
    vm.nextTick()
    .then(() => {
      id0.should.be.checked
      id1.should.not.be.checked
      id2.should.not.be.checked
      vm.checks = ['id-0', 'id-1']
      return vm.nextTick()
    }).then(() => {
      id0.should.be.checked
      id1.should.be.checked
      id2.should.not.be.checked
      vm.checks = ['id-1']
      return vm.nextTick()
    }).then(() => {
      id0.should.not.be.checked
      id1.should.be.checked
      id2.should.not.be.checked
      vm.checks = ['id-1', 'id-0']
      return vm.nextTick()
    }).then(() => {
      id0.should.be.checked
      id1.should.be.checked
      id2.should.not.be.checked
      return vm.nextTick()
    }).then(done, done)
  })

  it('can start with a numeric value', (done) => {
    let numCheck = vm.$('#number')
    vm.numCheck.should.be.eql(0)
    numCheck.should.not.be.checked
    vm.numCheck = 1
    vm.nextTick()
    .then(() => {
      numCheck.should.be.checked
    }).then(done, done)
  })
})
