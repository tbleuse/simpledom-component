import * as SimpleDom from '../src/main';

import chai from 'chai';

const expect = chai.expect;

function cleanContainer() {
    if (document.getElementById('container')) {
        document.getElementById('container').remove();
    }

    const container = document.createElement('div');
    container.id = 'container';

    document.body.appendChild(container);
}

describe('SimpleDom component API', () => {


    describe('simple hekki wolrd', () => {
        it('SimpleTest', () => {

            cleanContainer();

            class HelloWorld extends SimpleDom.Component {
                render() {
                    return (
                        <h1>Hello {this.props.name}!</h1>
                    );
                }
            }


            SimpleDom.renderToDom(
                'container', <HelloWorld name="John"/>
            );

            expect(document.getElementById('container').innerHTML).to.be.equal(
                '<h1>Hello John!</h1>');
        });

        it('Un simple reactive component', () => {
            cleanContainer();

            class Counter extends SimpleDom.Component {
                eventsToSubscribe() {
                    return ['UPDATE_COUNTER'];
                }

                render() {
                    return (
                        <h1 id="counter-h1">{this.state.counter}</h1>
                    );
                }
            }

            class IncCounter extends SimpleDom.Component {
                inc() {
                    this.store.updateState({counter: this.state.counter+1}, 'UPDATE_COUNTER');
                }

                render() {
                    return (
                        <button id="inc-button" onClick={this.inc}>+1</button>
                    );
                }
            }

            SimpleDom.renderToDom(
                'container',
                <div>
                    <Counter/>
                    <IncCounter/>
                </div>,
                new SimpleDom.Store({counter: 0})
            );

            const buttonNode = document.getElementById('inc-button');

            const counterNode = document.getElementById('counter-h1');

            expect(document.getElementById('counter-h1').innerHTML).to.be.equal('0');

            document.getElementById('inc-button').click();

            expect(document.getElementById('counter-h1').innerHTML).to.be.equal('1');

            expect(document.getElementById('container').contains(buttonNode)).to.be.true;
            expect(document.getElementById('container').contains(counterNode)).to.be.false;

        })
    });

});
