addEventListener("message", (event: MessageEvent) => {
    const [p, formula] = event.data;
    const { time, money, worker, factory, buster } = p
    let cond
    try {
        cond = eval(formula)
    } catch {
        postMessage({
            success: false,
            cond: false
        })
        return
    }
    postMessage({
        success: cond !== undefined,
        cond
    })
});
