import React from 'react'
import '../styles/calculator-interface.css'
import { DesignerModal } from './designer-modal'

export interface CalculatorInterfaceProps {
    title: string
}

export interface CalculatorInterfaceState {
    nightMode: boolean
    valueAnswer: string
    valueInput: string
    modalOpen: boolean
    answerHistory: string[][]
}
export class CalculatorInterface extends React.Component<
    CalculatorInterfaceProps,
    CalculatorInterfaceState
> {
    constructor(props: CalculatorInterfaceProps) {
        super(props)
        this.state = {
            nightMode: false,
            valueAnswer: '',
            valueInput: '',
            modalOpen: false,
            answerHistory: [],
        }
    }
    render() {
        const upperActionButtons = ['undo', 'clear', 'divide', 'backspace']
        const sideActionButtons = ['times', 'minus', 'plus', 'equals']
        const inputValues = [
            '7',
            '8',
            '9',
            '4',
            '5',
            '6',
            '1',
            '2',
            '3',
            'Designer',
            '0',
            '.',
        ]
        return (
            <div
                className={
                    'mobile-screen d-grid' +
                    (this.state.nightMode ? ' night-mode' : '')
                }
            >
                <DesignerModal
                    show={this.state.modalOpen}
                    handleClose={this.hideModal}
                />

                <div
                    className={
                        'display-wrapper d-grid' +
                        (this.state.nightMode ? ' night-mode' : '')
                    }
                >
                    <div className="night-mode-icon">
                        <button onClick={this.setNightMode}>
                            <i
                                className={
                                    'fas fa-' +
                                    (this.state.nightMode
                                        ? 'sun night-mode'
                                        : 'moon')
                                }
                            ></i>
                        </button>
                    </div>
                    <div className="display-output">
                        <h4> {this.state.valueInput || '0'}</h4>
                    </div>
                    <div className="display-results d-grid">
                        <i className="fas fa-equals"></i>
                        <div className="results">
                            <h2>&nbsp;{this.state.valueAnswer}</h2>
                        </div>
                    </div>
                </div>
                <div className="display-inputs d-grid">
                    <div className="d-grid column-div">
                        {upperActionButtons.map((val: string, key: number) =>
                            this.createActionButton(val, key)
                        )}
                    </div>
                    <div className="d-grid bottom-inputs">
                        <div className="d-grid number-inputs">
                            {inputValues.map((val: string, key: number) =>
                                this.createInputButton(val, key)
                            )}
                        </div>
                        <div className="d-grid bottom-action-inputs">
                            {sideActionButtons.map((val: string, key: number) =>
                                this.createActionButton(val, key)
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    private createInputButton(label: string, key: number) {
        return (
            <button
                key={key}
                className="input-button"
                onClick={() => this.updateInput(label)}
            >
                <strong>{label}</strong>
            </button>
        )
    }

    private createActionButton(label: string, key: number) {
        return (
            <button
                key={key}
                className={
                    'action-button ' +
                    (this.state.nightMode ? 'night-mode' : '')
                }
                onClick={() => this.onClickAction(label)}
            >
                {label === 'clear' ? (
                    <strong>C</strong>
                ) : (
                    <i className={'fas fa-' + label}></i>
                )}
            </button>
        )
    }
    private setNightMode = (event: any) => {
        this.setState((state) => ({
            nightMode: !state.nightMode,
        }))
    }

    private hideModal = () => {
        this.setState({ modalOpen: false })
    }

    private updateInput = (value: string) => {
        if (value === 'Designer') {
            this.setState((state) => ({
                modalOpen: true,
            }))
            return
        }

        if (this.validateInput(value)) {
            const inputInState =
                !this.state.valueInput &&
                this.state.valueAnswer &&
                isNaN(parseInt(value))
                    ? this.state.valueAnswer
                    : this.state.valueInput
            const updateInput =
                inputInState.length < 32
                    ? inputInState.concat(value)
                    : inputInState

            this.setState((state) => ({
                valueInput: updateInput,
                valueAnswer: '',
            }))
        } else return
    }

    private validateInput = (newChar: string): boolean => {
        const previousInputs = this.state.valueInput
        const previousAnswer = this.state.valueAnswer
        const splitInputs = previousInputs.split(/[^\d.]/)
        switch (newChar) {
            case '.':
                if (
                    splitInputs[splitInputs.length - 1].includes('.') ||
                    (!previousInputs && previousAnswer.includes('.'))
                )
                    return false
                break
            case '-':
                if (previousInputs[previousInputs.length - 1] === '-')
                    return false
                break
            case '+':
                if (previousInputs[previousInputs.length - 1] === '+')
                    return false
                break
            case 'x':
            case '÷':
                if (
                    (previousInputs &&
                        isNaN(
                            parseInt(previousInputs[previousInputs.length - 1])
                        )) ||
                    (!previousInputs && !previousAnswer)
                )
                    return false
                break
            case '0':
                if (
                    parseInt(splitInputs[splitInputs.length - 1]) === 0 &&
                    !splitInputs[splitInputs.length - 1].includes('.')
                )
                    return false
                break
            default:
                return true
        }
        return true
    }
    private onClickAction = (value: string) => {
        switch (value) {
            case 'minus':
                return this.updateInput('-')
            case 'plus':
                return this.updateInput('+')
            case 'divide':
                return this.updateInput('÷')
            case 'times':
                return this.updateInput('x')
            case 'clear':
                return this.clearAllInputs()
            case 'backspace':
                return this.backspaceInput()
            case 'equals':
                return this.calculateInputs()
            case 'undo':
                return this.undoLatest()
            default:
                break
        }
    }

    private clearAllInputs = () => {
        this.setState((state) => ({
            valueInput: '',
            valueAnswer: '',
        }))
    }

    private backspaceInput = () => {
        const inputInState = this.state.valueInput
        const updateInput = inputInState.length
            ? inputInState.substring(0, inputInState.length - 1)
            : inputInState
        this.setState((state) => ({
            valueInput: updateInput,
        }))
    }

    private calculateInputs = () => {
        const inputInState: string = this.state.valueInput
        const answerHistory: string[][] = this.state.answerHistory
        const res = inputInState.replace('x', '*').replace('÷', '/')

        try {
            eval(res)
        } catch (err) {
            return
        }
        const answer: string = res
            ? eval(res).toString()
            : this.state.valueAnswer
        answerHistory.push([inputInState, answer])
        this.setState((state) => ({
            valueAnswer: answer,
            valueInput: '',
        }))
    }

    private undoLatest = () => {
        const answerHistory = this.state.answerHistory
        if (answerHistory.length >= 1) {
            const lastValues = answerHistory!.pop()
            const previousInput = lastValues![0]
            const previousAnswer = lastValues![1]
            this.setState((state) => ({
                valueAnswer: previousAnswer,
                valueInput: previousInput,
                answerHistory: answerHistory,
            }))
        }
    }
}
