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
        const upperActionButtons: string[] = [
            'undo',
            'clear',
            'divide',
            'backspace',
        ]
        const sideActionButtons: string[] = ['times', 'minus', 'plus', 'equals']
        const inputValues: string[] = [
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
        const { nightMode, valueAnswer, valueInput, modalOpen } = this.state
        return (
            <div
                className={
                    'mobile-screen d-grid' + (nightMode ? ' night-mode' : '')
                }
            >
                <DesignerModal show={modalOpen} handleClose={this.hideModal} />

                <div
                    className={
                        'display-wrapper d-grid' +
                        (nightMode ? ' night-mode' : '')
                    }
                >
                    <div className="night-mode-icon">
                        <button onClick={this.setNightMode}>
                            <i
                                className={
                                    'fas fa-' +
                                    (nightMode ? 'sun night-mode' : 'moon')
                                }
                            ></i>
                        </button>
                    </div>
                    <div className="display-output">
                        <h4>
                            &nbsp;
                            {valueInput}
                        </h4>
                    </div>
                    <div className="display-results d-grid">
                        {valueAnswer && <i className="fas fa-equals"></i>}
                        <div className="results">
                            <h2>&nbsp;{valueAnswer}</h2>
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
        const { nightMode } = this.state
        return (
            <button
                key={key}
                className={'action-button ' + (nightMode ? 'night-mode' : '')}
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
    private setNightMode = (event: any): void => {
        this.setState((state) => ({
            nightMode: !state.nightMode,
        }))
    }

    private hideModal = (): void => {
        this.setState({ modalOpen: false })
    }

    private updateInput = (value: string) => {
        if (value === 'Designer') {
            this.setState((state) => ({
                modalOpen: true,
            }))
            return
        }
        const { valueInput, valueAnswer } = this.state

        if (this.validateInput(value)) {
            const inputInState =
                !valueInput && valueAnswer && isNaN(parseInt(value))
                    ? valueAnswer
                    : valueInput
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

    private clearAllInputs = (): void => {
        this.setState((state) => ({
            valueInput: '',
            valueAnswer: '',
        }))
    }

    private backspaceInput = (): void => {
        const { valueInput } = this.state
        const updateInput = valueInput.length
            ? valueInput.substring(0, valueInput.length - 1)
            : valueInput
        this.setState((state) => ({
            valueInput: updateInput,
        }))
    }

    private calculateInputs = (): void => {
        const { valueInput, answerHistory, valueAnswer } = this.state
        const res = this.mathifyInputString(valueInput)

        try {
            eval(res)
        } catch (err) {
            return
        }
        const answer: string = res ? eval(res).toString() : valueAnswer
        answerHistory.push([valueInput, answer])
        this.setState((state) => ({
            valueAnswer: answer,
            valueInput: '',
        }))
    }

    private undoLatest = (): void => {
        const { answerHistory } = this.state
        if (answerHistory) {
            const lastValues = answerHistory.pop()
            if (lastValues) {
                const previousInput = lastValues[0]
                const previousAnswer = lastValues[1]
                this.setState((state) => ({
                    valueAnswer: previousAnswer,
                    valueInput: previousInput,
                    answerHistory: answerHistory,
                }))
            }
        }
    }

    private mathifyInputString = (userInput: string): string => {
        return userInput.replace('x', '*').replace('÷', '/')
    }
}
