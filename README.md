# mocha-vs-ava-performance
Setup to help identify performance problems for AVA

### Motivation
[AVA](https://github.com/sindresorhus/ava) is a test runner that is a promising alternative to [Mocha](https://github.com/mochajs/mocha). When trying to switch from Mocha to AVA, one thing that was pretty obvious is how slow it ran compared to Mocha, especially when comparing the 'watch' versions of both, even though AVA promised to be faster. The ideal result for AVA would be to give immediate feedback, just like Mocha does when in watch mode (at least on a restricted number of fast tests).

Here is a small setup with a few very simple tests, that can be used as a benchmark. Maybe AVA gets comparatively faster the more tests you have, but since when developing it often happens that I run only a few files to keep the feedback quick, I deem important the fact to run quickly even on small test bases. Node that the code is transpiled using Babel, so that takes a significant portion of the time.

### Setup

```
git clone https://github.com/jfmengels/mocha-vs-ava-performance.git mocha-ava
cd mocha-ava
npm install
```

### Run tests

Take a look at the scripts available in `package.json`.

__NOTE__: Most of these commands use Linux's `time` command for benchmark. If you run on OSX, remove the `-f'%E'` part in the commands which is not available on OSX `time` command. I have a hard time (no pun intended) reading the output without it, so I keep it there.

```
# Run tests once
npm run test-mocha
npm run test-ava
npm run test-ava:no-cache # without the cache that AVA creates on its first run

# Watch code and run tests on change
npm run test-mocha:watch
npm run test-ava:watch
```

At the moment of this writing (but go and test it yourself as this might be outdated), here are some approximate times that I measured.

#### Mocha

Times gotten from the time command, not the ones displayed by Mocha, since tests setup takes a considerable portion of the time.
- Run once: 3.19s, 3.22s, 3.15s, 3.25s, 3.17s.
- Watch: first run is probably the same as when run once, afterwards Mocha usually displays a time less than 10ms (there is no setup at every new run, making it very fast).

#### AVA

- Run once: 5.14s, 5.97s, 4.85s, 5.09s, 5.23s.
- Without cache: 8.35s, 8.34s, 8.31s, 7.94, 8.51s.
- Watch (using nodemon): 5.44s, 4.92s, 4.85s, 5.71s, 4.89s.

#### Note

Oddly, and I have yet to discover the cause, when testing this repo by cloning it in a new folder, the tests ran considerably faster (<2s for AVA, <1s for Mocha) than they were in the original folder I wrote this all in. So the benchmark times were smaller, though Mocha was still much faster.
