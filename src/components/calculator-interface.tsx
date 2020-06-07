import React from 'react'
import '../styles/calculator-interface.css'

export interface CalculatorInterfaceProps {
    title: string
}

export interface CalculatorInterfaceState {
    nightMode: boolean
    valueAnswer: string
    valueInput: string
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
            '',
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
                    <input className="display-output" />
                    <div className="display-results d-grid">
                        <i className="fas fa-equals"></i>
                        <div className="results">23455</div>
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
            <button key={key} className="input-button">
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
            >
                {label == 'clear' ? (
                    <strong>C</strong>
                ) : (
                    <i className={'fas fa-' + label}></i>
                )}
            </button>
        )
    }
    private setNightMode = (event: any) => {
        console.log(this.state.nightMode)
        this.setState((state) => ({
            nightMode: !state.nightMode,
        }))
    }
}
