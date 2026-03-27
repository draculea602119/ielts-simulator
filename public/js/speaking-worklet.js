/**
 * AudioWorklet processor — captures mic input as PCM Int16 chunks
 * Input: Float32 frames at AudioContext sample rate (should be 16kHz)
 * Output: Int16Array buffers posted to main thread every ~256ms
 */
class MicProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = new Float32Array(4096); // ~256ms at 16kHz
    this.offset = 0;
  }

  process(inputs) {
    const input = inputs[0]?.[0];
    if (!input) return true;

    for (let i = 0; i < input.length; i++) {
      this.buffer[this.offset++] = input[i];
      if (this.offset >= this.buffer.length) {
        const int16 = new Int16Array(this.buffer.length);
        for (let j = 0; j < this.buffer.length; j++) {
          int16[j] = Math.max(-32768, Math.min(32767, Math.floor(this.buffer[j] * 32767)));
        }
        this.port.postMessage(int16.buffer, [int16.buffer]);
        this.buffer = new Float32Array(4096);
        this.offset = 0;
      }
    }
    return true;
  }
}

registerProcessor('mic-processor', MicProcessor);
